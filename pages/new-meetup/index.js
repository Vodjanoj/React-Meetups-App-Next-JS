// our domain.com/new-meetup
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter()
  const addMeetupHandler = async (enteredMeetupData) => {
    // path pages/api/new-meetup
    const response = await fetch("/api/new-meetup",{
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
      
    const data = await response.json();

    console.log(data);

    //  go back to just slash nothing.
    router.push('/')
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
