import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Contact } from 'src/shared/models/contact.model';
import * as ContactListActions from '../contact-list/store/contact-list.actions';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  id: number;
  dialogForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private store: Store<{ contactList: { contacts: Contact[] } }>
  ) { }

  ngOnInit() {
    this.dialogForm = new FormGroup({});
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirmDelete() {
    this.store.dispatch(new ContactListActions.DeleteContact(this.id));
    this.dialogRef.close();
  }

}
