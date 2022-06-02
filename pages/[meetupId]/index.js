import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://vladimirs:vovan2001@cluster0.1nvkxcj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // db to get hold of that database to which we're connecting here (meetups in the URL)
  const db = client.db();

  // you get hold of a collection by using your database db and then the collection method.
  const meetupsCollection = db.collection("meetups");

  // first {} means give me all the objects
  const meetups = await meetupsCollection
    .find({})
    .project({ _id: 1 })
    .toArray();

  client.close();

  return {
    // This key (fallback) tells NextJS whether your paths array contains all supported parameter values
    // or just some of them. If you set fall back to false, you say that your paths contains all supported meetup ID values.
    // That means that if the user enters anything that's not supported here, for example, M3 he or she would see a 404 error.
    // If you set fall back to true on the other hand, NextJS would try to generate a page for this meetup ID dynamically on the server
    // for the incoming request.

    // When you set fallback to true or to blocking, you're telling NextJS that the list of paths which you're specifying here, might not be exhaustive.
    // And, therefore, when fallback is set to true or to blocking NextJS will not respond with a 404 page if it can't find the page immediately.
    // Instead with fallback set to true or blocking, it will then generate that page on demand and thereafter cache it, so it will pre-generate it when needed.
    // Now the difference between true and blocking then is that, with true, it would immediately return an empty page, and then pull down the dynamically generated content once that's done.
    // So you need to handle that case that the page does not have the data yet. With blocking, the user will not see anything until the page was pre-generated,
    // and the finished page will be served.
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  // when we accept it on getStaticProps, context will not hold request and response, but it will, for example, have a params key.
  // and that will be an object where our identifiers between the square brackets ([meetupId]) will be properties and the values will be the actual values
  // encoded in the URL. And that would then be the concrete meetup ID for which we're displaying this meetup.
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://vladimirs:vovan2001@cluster0.1nvkxcj.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  // db to get hold of that database to which we're connecting here (meetups in the URL)
  const db = client.db();

  // you get hold of a collection by using your database db and then the collection method.
  const meetupsCollection = db.collection("meetups");

  // ObjectId convert string into such a ObjectId object.
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
