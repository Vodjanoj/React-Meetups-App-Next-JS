// our domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {

  const onAddMeetupHandler = (enteredMeetupDate) => {
      console.log(enteredMeetupDate)
  };

  return <NewMeetupForm onAddMeetup={onAddMeetupHandler} />;
};

export default NewMeetupPage;
