const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://SIT774_Example:it8_P-rscyza99h@cluster0.nata69c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to the database!");
    return client.db().collection('Cat');
  } catch (ex) {
    console.error("Failed to connect to the database:", ex);
    throw ex;
  }
}

module.exports = { connectToDB, client };