import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Contact } from 'src/shared/models/contact.model';
import { ContactService } from 'src/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
  id: number;
  name: string;
  phoneNumber: string;
  numberType: string;
  category: string;
  isEditMode = false;
  contactForm: FormGroup;

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


  constructor(public dialogRef: MatDialogRef<ContactComponent>, private contactService: ContactService) { }

  ngOnInit() {
    if (this.isEditMode) {
      this.contactForm = new FormGroup({
        nameControl: new FormControl(this.name),
        phoneNumberControl: new FormControl(this.phoneNumber),
        phoneNumberTypeControl: new FormControl(this.numberType),
        categoryControl: new FormControl(this.category)
      });
    }
    else {
      this.contactForm = new FormGroup({
        nameControl: new FormControl(),
        phoneNumberControl: new FormControl(),
        phoneNumberTypeControl: new FormControl(),
        categoryControl: new FormControl()
      });
    }

  }

  onSubmit() {
    if (this.contactForm.valid) {
      if(this.isEditMode)
      {
        let updatedContact: Contact = {
          id : this.id,
          name : this.contactForm.value.nameControl,
          phoneNumber: this.contactForm.value.phoneNumberControl,
          numberType: this.contactForm.value.phoneNumberTypeControl,
          category: this.contactForm.value.categoryControl
        };
        this.contactService.updateContact(updatedContact);
      }
      else
      {
        let newId = this.contactService.contacts.length + 1;
        let newContact: Contact = {
          id : newId,
          name : this.contactForm.value.nameControl,
          phoneNumber: this.contactForm.value.phoneNumberControl,
          numberType: this.contactForm.value.phoneNumberTypeControl,
          category: this.contactForm.value.categoryControl
        };
        this.contactService.addContact(newContact);
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

}
