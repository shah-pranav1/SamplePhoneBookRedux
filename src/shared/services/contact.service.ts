import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {

  contacts: Contact[] = [
    { id: 1, name: 'Jack', phoneNumber: '0747474747', numberType: 'Mobile', category: 'Family' },
    { id: 2, name: 'Mash', phoneNumber: '0113123121', numberType: 'Work', category: 'Friend' },
    { id: 3, name: 'Tony', phoneNumber: '0104567412', numberType: 'Home', category: 'Office' },
    { id: 4, name: 'Dr. Hintz', phoneNumber: '0841841841', numberType: 'Mobile', category: 'Health' },
    { id: 5, name: 'Rocky', phoneNumber: '0636352525', numberType: 'Mobile', category: 'Family' },
    { id: 6, name: 'Sandy', phoneNumber: '0114521453', numberType: 'Mobile', category: 'Friend' },
    { id: 7, name: 'Nancy', phoneNumber: '0127854782', numberType: 'Mobile', category: 'Office' }
  ];

  contactsChanged = new BehaviorSubject<Contact[]>(this.contacts);

  // getContacts() {
  //   return this.contacts.slice();
  // }

  addContact(newContact: Contact) {
    this.contacts.push(newContact);
    this.contactsChanged.next(this.contacts.slice());
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex(item => item.id === updatedContact.id);
    this.contacts[index] = updatedContact;
    this.contactsChanged.next(this.contacts.slice());
  }

  deleteContact(id: number) {
    const index = this.contacts.findIndex(item => item.id === id);
    this.contacts.splice(index, 1);
    this.contactsChanged.next(this.contacts.slice());
  }
}
