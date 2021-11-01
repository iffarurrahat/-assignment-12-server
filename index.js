const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.dbuser);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3skml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('travel');
    const placeCollection = database.collection('place');

    // add Place
    app.post('/addPlace', async (req, res) => {
      console.log(req.body);
      const result = await placeCollection.insertOne(req.body);
      console.log(result);
    });

    // GET API
    app.get('/addPlace', async (req, res) => {
      const cursor = placeCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running my CRUD Server');
});

app.listen(port, () => {
  console.log('Running Server on port', port);
});
