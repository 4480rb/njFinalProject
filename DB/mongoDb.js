const { MongoClient } = require('mongodb');
const connectionString = "mongodb://srv1:27017";


class mongoDb {

  constructor() {

  }

  async connect() {
    const client = new MongoClient(connectionString);

    let connected = await client.connect();
    this.db = connected.db("213257447Chavi&Orit");

    console.log("DB Connected!")
  };

  getDB() {
    return this.db;
  }
}


module.exports = new mongoDb();