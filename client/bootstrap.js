const TileDocument = require('@ceramicnetwork/stream-tile').TileDocument;
const KeyDidResolver = require('key-did-resolver').default;
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const { DID } = require('dids');
const Ceramic = require('@ceramicnetwork/http-client').default;
const { Ed25519Provider } = require('key-did-provider-ed25519');
const { Resolver } = require('did-resolver')
const fromString = require('uint8arrays/from-string');

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
  const job = await TileDocument.create(ceramic, Job);
  const user = await TileDocument.create(ceramic, User);
  console.log(job)
}

run().catch(console.error);