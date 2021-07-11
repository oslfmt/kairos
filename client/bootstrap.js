// This script publishes the definitions and schemas necessary to run the application
const TileDocument = require('@ceramicnetwork/stream-tile').TileDocument;
const KeyDidResolver = require('key-did-resolver').default;
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const { DID } = require('dids');
const Ceramic = require('@ceramicnetwork/http-client').default;
const { Ed25519Provider } = require('key-did-provider-ed25519');
const { Resolver } = require('did-resolver')
const fromString = require('uint8arrays/from-string');
const { writeFile } = require('fs').promises;
require('dotenv').config();

// import schemas
const User = require('./models/user.json');
const Job = require('./models/job.json');
const config = require('./src/config.json');
const API_URL = 'https://ceramic-clay.3boxlabs.com';
let ceramic; // global ceramic instance

async function setCeramic() {
  const seed = fromString(process.env.SEED, 'base16');
  ceramic = new Ceramic(API_URL);
  const resolver = new Resolver({ ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) });
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver });
  ceramic.setDID(did);
  await ceramic.did.authenticate();

  console.log('Initialized ceramic instance');
}

async function publishSchemas() {
  const jobSchema = await TileDocument.create(ceramic, Job, { family: "schema" });
  const userSchema = await TileDocument.create(ceramic, User, { family: "schema" });

  // create definition using userSchema commitID
  const userDefinition = await TileDocument.create(
    ceramic,
    {
      name: 'KairosProfile',
      description: 'user profile',
      schema: userSchema.commitId.toUrl()
    }
  );

  // write config to json file
  const config = {
    definitions: {
      KairosProfile: userDefinition.id.toString()
    },
    schemas: {
      Job: jobSchema.commitId.toString(),
      User: userSchema.commitId.toString(),
    }
  };

  // write schema commitIds to config file to be used later
  await writeFile('./src/config.json', JSON.stringify(config));
  console.log('Config written to src/config.json file', config);
  process.exit(0);
}

async function updateSchema(streamID, newSchema) {
  const doc = await TileDocument.load(ceramic, streamID);
  await doc.update(newSchema);
}

function main() {
  try {
    // initialize ceramic instance
    setCeramic();

    // publish or update the schemas, depending on args
    if (process.argv[2] === "publish") {
      publishSchemas();
    } else if (process.argv[2] === "update") {
      if (process.argv[3] === "user") {
        updateSchema(config.schemas.User, User);
      } else if (process.argv[3] === "job") {
        updateSchema(config.schemas.Job, Job)
      }
    }
  } catch(e) {
    console.error(e);
  }
}

main();