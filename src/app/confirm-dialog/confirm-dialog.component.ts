import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { ContactService } from 'src/shared/services/contact.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  id: number;
  dialogForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, private contactService: ContactService) { }

  ngOnInit() {
    this.dialogForm = new FormGroup({});
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onConfirmDelete(){
this.contactService.deleteContact(this.id);
console.log(this.contactService.contacts);
this.dialogRef.close();
  }

}
