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
    // When we add this property to the object returned by getStaticProps, we unlock a feature called incremental Static Generation.
    // Revalidate wants a number, let's say 10, and this number is the number of seconds NextJS will wait until it regenerates this page
    // for an incoming request. That means that with revalidate set to some number, this page will not just be generated during the build process.
    // It will be generated there but not just but it will also be generated every couple of seconds on the server, at least if there are requests
    // for this page. So that means that this page, with revalidate set to 10 would be regenerated on the server at least every 10 seconds if there are requests coming in
    // for this page. And then these regenerated pages would replace the old pre-generated pages.
    revalidate: 10 
  };
}

export default HomePage;
