import { useSelector, useDispatch } from 'react-redux';
import css from 'components/ContactForm/ContactForm.module.css';

import { getFilteredContacts } from 'Redux/contacts/contacts-selectors';
import { getFilter } from 'Redux/filter/filter-selectors';
import { addContact, deleteContact } from 'Redux/contacts/contacts-slice';
import { setFilter } from 'Redux/filter/filter-slice';
import ContactList from 'components/Contact/Contact';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';

const ContactForm = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

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
    return true;
  };

  const handleDeleteContact = id => {
    const action = deleteContact(id);
    dispatch(action);
  };
  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  //  const filteredContacts = getFilteredContacts();

  return (
    <div className={css.style}>
      <h4>Phonebook</h4>
      <div className={css.wrapper}>
        <div className={css.block}>
          <Form onSubmit={handleAddContact} />
        </div>
        <div>
          <h4>Contacts</h4>
          <Filter value={filter} handleChange={changeFilter} />
          <ContactList
            deleteContact={handleDeleteContact}
            filteredContacts={filteredContacts}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
