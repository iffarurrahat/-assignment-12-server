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
    // const placeCollection = database.collection('booking');

    app.post('/addPlace', async (req, res) => {
      const newPlace = req.body;
      console.log('hit the post api', req.body);
      res.send('hit the post');
      const result = await placeCollection.insertOne(newPlace);
      // console.log('got new place', req.body);
      // console.log('add user', result);
      res.json(result);
    });

    //GET API
    app.get('/addPlace', async (req, res) => {
      const cursor = placeCollection.find({});
      const addPlace = await cursor.toArray();
      res.send(addPlace);
    });

    // Delete
    // DELETE API
    app.delete('/addPlace/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await placeCollection.deleteOne(query);

      console.log('deleting user with id ', result);

      res.json(result);
    });

    // //update status
    // app.put('/update/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const updatedBooking = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       status: updatedBooking.status,
    //     },
    //   };
    //   const result = await placeCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   console.log('updating', id);
    //   res.json(result);
    // });
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


