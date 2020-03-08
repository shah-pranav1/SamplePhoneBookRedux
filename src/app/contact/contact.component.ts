import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Contact } from 'src/shared/models/contact.model';
import * as ContactListActions from '../contact-list/store/contact-list.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit, OnDestroy {
  id: number;
  name: string;
  phoneNumber: string;
  numberType: string;
  category: string;
  isEditMode = false;
  contactForm: FormGroup;
  formHeading = 'Add Contact';
  contactStoreSub: Subscription;
  newId: number;

  phoneNumberTypes: string[] = [
    'Work',
    'Mobile',
    'Home'
  ];

  categories: string[] = [
    'Family',
    'Friend',
    'Office',
    'Health',
    'Kids',
    'Education'
  ];


  constructor(
    public dialogRef: MatDialogRef<ContactComponent>,
    private store: Store<{ contactList: { contacts: Contact[] } }>
  ) { }

  ngOnInit() {
    if (this.isEditMode) {
      this.formHeading = 'Edit Contact';
      this.contactForm = new FormGroup({
        nameControl: new FormControl(this.name, [Validators.required]),
        phoneNumberControl: new FormControl(this.phoneNumber, [Validators.required, Validators.minLength(10)]),
        phoneNumberTypeControl: new FormControl(this.numberType, [Validators.required]),
        categoryControl: new FormControl(this.category, [Validators.required])
      });
    } else {
      this.contactForm = new FormGroup({
        nameControl: new FormControl(null, [Validators.required]),
        phoneNumberControl: new FormControl(null, [Validators.required, Validators.minLength(10)]),
        phoneNumberTypeControl: new FormControl(null, [Validators.required]),
        categoryControl: new FormControl(null, [Validators.required])
      });
    }

  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.isEditMode) {
        const updatedContact: Contact = {
          id: this.id,
          name: this.contactForm.value.nameControl,
          phoneNumber: this.contactForm.value.phoneNumberControl,
          numberType: this.contactForm.value.phoneNumberTypeControl,
          category: this.contactForm.value.categoryControl
        };
        this.store.dispatch(new ContactListActions.UpdateContact(updatedContact));
      } else {
        this.contactStoreSub = this.store.select('contactList').subscribe(data => {
          this.newId = data.contacts.length + 1;
        });
        const newContact: Contact = {
          id: this.newId,
          name: this.contactForm.value.nameControl,
          phoneNumber: this.contactForm.value.phoneNumberControl,
          numberType: this.contactForm.value.phoneNumberTypeControl,
          category: this.contactForm.value.categoryControl
        };
        this.store.dispatch(new ContactListActions.AddContact(newContact));
      }

      this.closeDialog();
    }
  }

  initializeFormGroup() {
    this.contactForm.setValue({
      nameControl: null,
      phoneNumberControl: null,
      phoneNumberTypeControl: null,
      categoryControl: null
    });
  }

  closeDialog() {
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  ngOnDestroy(){
    if(this.contactStoreSub){
      this.contactStoreSub.unsubscribe();
    }
  }

}
