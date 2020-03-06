import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({providedIn: 'root'})
export class ContactService{

  contacts: Contact[] = [
    { id: 1, name: 'Jack', phoneNumber: '0747474747', numberType: 'Mobile', category: 'Family' },
    { id: 2, name: 'Mash', phoneNumber: '011312312', numberType: 'Work', category: 'Friend' },
    { id: 3, name: 'Tony', phoneNumber: '010456741', numberType: 'Home', category: 'Office' },
    { id: 4, name: 'Dr. Hintz', phoneNumber: '0841841841', numberType: 'Mobile', category: 'Health' },
    { id: 5, name: 'Rocky', phoneNumber: '0636352525', numberType: 'Mobile', category: 'Family' },
    { id: 6, name: 'Sandy', phoneNumber: '011452145', numberType: 'Mobile', category: 'Friend' },
    { id: 7, name: 'Nancy', phoneNumber: '012785478', numberType: 'Mobile', category: 'Office' }
  ];

  getContacts() {
    return this.contacts;
  }

  addContact(newContact: Contact){
    this.contacts.push(newContact);
  }

  updateContact(updatedContact: Contact) {
    let index = this.contacts.findIndex(item => item.id === updatedContact.id);
    this.contacts[index] = updatedContact;
  }

  deleteContact(id: number){
    let index = this.contacts.findIndex(item => item.id === id);
    this.contacts.splice(index, 1);

  }
}
