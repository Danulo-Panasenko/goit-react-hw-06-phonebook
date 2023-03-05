import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from 'components/ContactForm/ContactForm.module.css';
import { nanoid } from 'nanoid';
import { addContact, deleteContact } from 'Redux/actions';
import ContactList from 'components/Contact/Contact';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';

const ContactForm = () => {
  const contacts = useSelector(store => store.contacts);
  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'));
  //   return contacts ? contacts : [];
  // });

  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const dispatch = useDispatch();

  const isDublicate = contName => {
    const normalizedName = contName.toLowerCase();
    const result = filteredContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    const action = addContact({ name, number });
    dispatch(action);
  };

  const handleDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const handleChange = ({ target }) => setFilter(target.value);
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };
  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.style}>
      <h4>Phonebook</h4>
      <div className={css.wrapper}>
        <div className={css.block}>
          <Form onSubmit={handleAddContact} />
        </div>
        <div>
          <h4>Contacts</h4>
          <Filter value={filter} handleChange={handleChange} />
          <ContactList
            deleteContact={handleDeleteContact}
            contacts={filteredContacts}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
