import classes from "./MeetupDetail.module.css";
// Now, why am I doing that? Just to keep the JSX code lean here and now also for styling reasons.
// We could have also imported a CSS file in the page component. This would work, it is a regular component after all.
// But I like to keep my pages folder lean and only have the page JS files in there.
// Now, for the other components on the other hand, it is quite common that we pair a JavaScript file with a CSS file

const MeetupDetail = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetail;
