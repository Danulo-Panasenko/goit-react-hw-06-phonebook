import { useState } from 'react';
import css from './Form.module.css';
import Button from 'components/Button/Button';
import inititalState from './inititalState.js';
import PropTypes from 'prop-types';

const Form = ({ onSubmit }) => {
  const [state, setState] = useState({ ...inititalState });

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   onSubmit(state);
  //   setState({ ...inititalState });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    const result = onSubmit({ name, number });
    if (result) {
      setState({ ...inititalState });
    }
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const { name, number } = state;
  return (
    <form onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label}>Name</label>
        <input
          value={name}
          onChange={handleChange}
          placeholder="Name"
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.formGroup}>
        <label className={css.label}>Number</label>
        <input
          value={number}
          onChange={handleChange}
          placeholder="Number"
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <Button type="submit">Add contact</Button>
    </form>
  );
};
export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
