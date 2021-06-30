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

const API_URL = 'https://ceramic-clay.3boxlabs.com';

async function run() {
  const seed = fromString(process.env.SEED, 'base16');
  const ceramic = new Ceramic(API_URL);
  const resolver = new Resolver({ ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) });
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver });
  ceramic.setDID(did);
  await ceramic.did.authenticate();

  // publish schemas
  const jobSchema = await TileDocument.create(ceramic, Job);
  const userSchema = await TileDocument.create(ceramic, User);

  // write config to json file
  const config = {
    schemas: {
      Job: jobSchema.commitId.toString(),
      User: userSchema.commitId.toString(),
    },
  };

  // write schema commitIds to config file to be used later
  await writeFile('./src/config.json', JSON.stringify(config));
  console.log('Config written to src/config.json file', config);
  process.exit(0);
}

run().catch(console.error);