import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef, Sort } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ContactComponent } from '../contact/contact.component';
import { filter, take, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Contact } from 'src/shared/models/contact.model';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  contactList: MatTableDataSource<any>;
  displayColumns: string[] = ['id', 'name', 'phoneNumber', 'numberType', 'category', 'action'];
  sortState: Sort = { active: 'id', direction: 'desc' };
  contactStoreSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ contactList: { contacts: Contact[] } }>
  ) { }

  ngOnInit() {
    this.populateContactList();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.contactList.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onAddContact() {
    this.openContactDialog();
  }

  onEditContact(row) {
    const contact: Contact = {
      id: row.id,
      name: row.name,
      phoneNumber: row.phoneNumber,
      numberType: row.numberType,
      category: row.category
    };
    this.openContactDialog(contact);
  }

  openContactDialog(contactData?: Contact) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '57%';
    dialogConfig.width = '30%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef: MatDialogRef<ContactComponent> = this.dialog.open(ContactComponent, dialogConfig);
    this.populateContactList();

    if (contactData) {
      dialogRef.componentInstance.id = contactData.id;
      dialogRef.componentInstance.name = contactData.name;
      dialogRef.componentInstance.phoneNumber = contactData.phoneNumber;
      dialogRef.componentInstance.numberType = contactData.numberType;
      dialogRef.componentInstance.category = contactData.category;
      dialogRef.componentInstance.isEditMode = true;
    }

    dialogRef.keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Escape'),
        take(1)
      )
      .subscribe(() => dialogRef.close());

  }

  populateContactList() {

      this.contactStoreSub = this.store.select('contactList').subscribe(data => {

        this.contactList = new MatTableDataSource(data.contacts);
        this.contactList.sort = this.sort;
        this.contactList.paginator = this.paginator;

        this.sort.active = this.sortState.active;
        this.sort.direction = this.sortState.direction;
        this.sort.sortChange.emit(this.sortState);

        this.contactList.filterPredicate = (data, filter) => {
          return this.displayColumns.some(ele => {
            return ele != 'action' && data[ele].toString().toLocaleLowerCase().indexOf(filter) != -1;
          });
        };
      });

  }

  onDeleteContact(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '18%';
    dialogConfig.width = '20%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.componentInstance.id = row.id;
    this.populateContactList();
    dialogRef.keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Escape'),
        take(1)
      )
      .subscribe(() => dialogRef.close());
  }

  ngOnDestroy() {
    if (this.contactStoreSub) {
      this.contactStoreSub.unsubscribe();
    }
  }

}
