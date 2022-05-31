import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="A First Meetup"
      address="Some Street 5, Some City"
      description="The meetup description"
    />
  );
};

export async function getStaticPaths() {
  return {
    // This key (fallback) tells NextJS whether your paths array contains all supported parameter values
    // or just some of them. If you set fall back to false, you say that your paths contains all supported meetup ID values.
    // That means that if the user enters anything that's not supported here, for example, M3 he or she would see a 404 error.
    // If you set fall back to true on the other hand, NextJS would try to generate a page for this meetup ID dynamically on the server
    // for the incoming request.
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}


export async function getStaticProps(context) {
  // fetch data for a single meetup
  // when we accept it on getStaticProps, context will not hold request and response, but it will, for example, have a params key.
  // and that will be an object where our identifiers between the square brackets ([meetupId]) will be properties and the values will be the actual values
  // encoded in the URL. And that would then be the concrete meetup ID for which we're displaying this meetup.
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "The meetup description",
      },
    },
  };
}

export default MeetupDetails;
