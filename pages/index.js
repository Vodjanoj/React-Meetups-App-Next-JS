import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a first meetup!",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export async function getStaticProps() {
  // any code you write in here will never end up on the client side and it will never execute on the client side
  // simply because this code is executed during the build process, not on the server and especially not on the clients
  // of your visitors. So the code in here will never reach the machines.
  // you might fetch data from API or read data from some files in the file system.
  // But then once you're done with whatever you did to get the data you need you need to return an object here in getStaticProps.
  // You always need to return an object here.
  // So now this is pre-rendered and it now contains the full HTML code and that's, of course, also great for search engines then
  // because now, data is not fetched in a second component render cycle on the client but initially, before this page is pre-rendered,
  // during the build process. And that's a great plus and one of the main features of NextJS, this data fetching for pre-rendering.
  return {
    // DUMMY_MEETUPS would be loaded and prepared in getStaticProps and then they would be set as props for this page component.
    props: {
      meetups: DUMMY_MEETUPS
    },
  };
}

export default HomePage;
