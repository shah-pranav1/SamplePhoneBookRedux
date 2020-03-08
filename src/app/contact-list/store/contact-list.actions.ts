import { Action } from '@ngrx/store';
import { Contact } from 'src/shared/models/contact.model';

export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';


export class AddContact implements Action {
  readonly type = ADD_CONTACT;

  constructor(public payload: Contact) { }

}

export class UpdateContact implements Action {
  readonly type = UPDATE_CONTACT;

  constructor(public payload: Contact) { }
}

export class DeleteContact implements Action {
  readonly type = DELETE_CONTACT;

  constructor(public payload: number) { }
}

export type ContactListActions = AddContact | UpdateContact | DeleteContact;
