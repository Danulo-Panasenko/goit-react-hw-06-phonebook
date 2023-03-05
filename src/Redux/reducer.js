import { ADD_CONTACT, DELETE_CONTACT } from './types';
const initialState = {
  contacts: [],
  filter: '',
};

const reducer = (store = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const newContact = [...store.contacts, action.payload];
      return { ...store, contact: newContact };

    case DELETE_CONTACT:
      const result = store.contacts.filter(item => item.id !== action.payload);
      return { ...store, contacts: result };
    default:
      return store;
  }
};
export default reducer;
