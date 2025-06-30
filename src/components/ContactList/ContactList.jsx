import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import Grid from "../Form/Form";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/filters/selectors";
import Loader from "../Loader/Loader";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const isError = useSelector((state) => state.contacts.isError);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return (
    <ul className={s.contactList}>
      <Grid>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <Contact id={id} name={name} number={number} />
          </li>
        ))}
      </Grid>
    </ul>
  );
};

export default ContactList;
