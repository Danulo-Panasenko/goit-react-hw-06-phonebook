import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
const ContactList = ({ deleteContact, filteredContacts }) => {
  const Contact = filteredContacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}:{number}
      <Button onClick={() => deleteContact(id)} type="button">
        Delete
      </Button>
    </li>
  ));
  return <ul>{Contact}</ul>;
};
export default ContactList;

ContactList.defaultProps = {
  filteredContacts: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
