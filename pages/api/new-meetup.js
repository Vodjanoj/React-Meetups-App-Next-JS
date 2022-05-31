import { MongoClient } from "mongodb";
// /api/new-meetup
// POST /api/new-meetup

// this function will receive a request and a response object.
// The request object contains data about the incoming request.
// The response object will be needed for sending back a response.

async function handler(req, res) {
  // Now, from that request object, we can get things like the headers or the request body and also the request method, route a method property here.
  // This allows us to find out which kind of request was sent.
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://vladimirs:vovan2001@cluster0.1nvkxcj.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    // db to get hold of that database to which we're connecting here (meetups in the URL)
    const db = client.db();

    // you get hold of a collection by using your database db and then the collection method.
    const meetupsCollection = db.collection("meetups");

    // insertOne is one of the built-in query commands for inserting one new document into this collection.
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
