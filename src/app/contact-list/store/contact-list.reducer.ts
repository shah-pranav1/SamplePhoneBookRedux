import { Contact } from 'src/shared/models/contact.model';
import * as ContactListActions from './contact-list.actions';

const initialState = {
  contacts: [
    new Contact(1, 'Jack', '0747474747', 'Mobile', 'Family'),
    new Contact(2, 'Mash', '0113123121', 'Work', 'Friend'),
    new Contact(3, 'Tony', '0104567412', 'Mobile', 'Office'),
    new Contact(4, 'Dr. Hintz', '0841841841', 'Work', 'Health'),
    new Contact(5, 'Rocky', '0636352525', 'Mobile', 'Family'),
    new Contact(6, 'Sandy', '0114521453', 'Mobile', 'Friend'),
    new Contact(7, 'Nancy', '0127854782', 'Mobile', 'Office')
  ]

};
export function contactListReducer(
  state = initialState,
  action: ContactListActions.ContactListActions) {
  switch (action.type) {
    case ContactListActions.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case ContactListActions.UPDATE_CONTACT:
      const updateIndex = state.contacts.findIndex(item => item.id === action.payload.id);
      const contact = state.contacts[updateIndex];
      const updatedContact = {
        ...Contact,
        ...action.payload
      };
      const updatedContacts = [...state.contacts];
      updatedContacts[updateIndex] = updatedContact;
      return {
        ...state,
        contacts: updatedContacts
      }
    case ContactListActions.DELETE_CONTACT:
      const deleteIndex = state.contacts.findIndex(item => item.id === action.payload);
      return {
        ...state,
        contacts: state.contacts.filter((c, index) => {
          return index !== deleteIndex;
        })
      }
    default:
      return state;
  }
}
