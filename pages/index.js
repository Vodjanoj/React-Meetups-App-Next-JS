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
    description: "This is a second meetup!",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// getServerSideProps will now not run during the build process, but instead always on the server after deployment.
// This getServerSideProps function runs for every incoming requests.
// Now, which one of the two should you use? Is getServerSideProps better or getStaticProps?
// getServerSideProps might sound better because it's guaranteed to run for every request.
// But that actually can be a disadvantage, because that means that you need to wait for your page to be generated on every incoming request.
// Now if you don't have data that changes all the time, and with that, I really mean that it changes multiple times every second.
// And if you don't need access to the request object, let's say for authentication, getStaticProps is actually better.
// Because there you pre-generate an HTML file, that file can then be stored and server by a CDN. And that simply is faster than regenerating
// and fetching that data for every incoming request. So your page will be faster when working with getStaticProps, because then it can be cached
// and reused, instead of regenerated all the time. Hence, you should really only use getServerSideProps if you need access to that concrete request object,
// because you don't have access to request and response in getStaticProps or if you really have data that changes multiple times every second,
// then therefore even 'revalidate' won't help you, then getServerSideProps is a great choice.

// export async function getServerSideProps(context) {

  // there in this context parameter, you also get access to the request object under the req key, and the response object
  // that will be sent back (just for example, here we return object with the props key, but you might also work with context
  // in different cases because you have access to the body, headers of response and etc.)

  // const req = context.req;
  // const res = context.res;

  // Any code you write in here will always run on the server, never in the client.

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

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
