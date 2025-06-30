import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "../../components/SearchBox/SearchBox";
import {
  fetchContactsThunk,
  deleteContactThunk,
  addContactThunk,
  updateContact,
} from "../../redux/contacts/operations";
import { getContacts } from "../../redux/contacts/selectors";
import { getFilter } from "../../redux/filters/selectors";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { toast } from "react-hot-toast";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContactsThunk());
    }
  }, [dispatch, isLoggedIn]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (contactId) => {
    setContactToDelete(contactId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContactThunk(contactToDelete));
    toast.success("Контакт видалено");
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleAddContact = (contact) => {
    dispatch(addContactThunk(contact));
    toast.success("Контакт додано!");
  };

  const handleUpdateContact = (contact) => {
    dispatch(updateContact(contact));
    toast.success("Контакт оновлено!");
  };

  return (
    <div>
      <ContactForm onAdd={handleAddContact} onUpdate={handleUpdateContact} />
      <SearchBox />
      <ContactList
        contacts={filteredContacts}
        onDelete={handleDelete}
        onUpdate={handleUpdateContact}
      />
      {isModalOpen && (
        <Modal onClose={cancelDelete} onConfirm={confirmDelete}>
          <p>Ви впевнені, що хочете видалити цей контакт?</p>
        </Modal>
      )}
    </div>
  );
};

export default Contacts;
