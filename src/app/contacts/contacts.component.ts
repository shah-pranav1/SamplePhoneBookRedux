import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatDialogRef, Sort } from '@angular/material';
import { ContactService } from 'src/shared/services/contact.service';
import { ContactComponent } from '../contact/contact.component';
import { filter, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;
  contactList: MatTableDataSource<any>;
  displayColumns: string[] = ['id', 'name', 'phoneNumber', 'numberType', 'category', 'action'];
  sortState: Sort = { active: 'id', direction: 'desc' };

  constructor(private contactService: ContactService, private dialog: MatDialog) { }

  ngOnInit() {
    this.contactList = new MatTableDataSource(this.contactService.getContacts());
    this.contactList.sort = this.sort;

    this.sort.active = this.sortState.active;
    this.sort.direction = this.sortState.direction;
    this.sort.sortChange.emit(this.sortState);

    this.contactList.paginator = this.paginator;
    this.contactList.filterPredicate = (data, filter) => {
      return this.displayColumns.some(ele => {
        return ele != 'action' && data[ele].toString().toLocaleLowerCase().indexOf(filter) != -1;
      });
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.contactList.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onAddContact() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '57%';
    dialogConfig.width = '30%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    let dialogRef: MatDialogRef<ContactComponent> = this.dialog.open(ContactComponent, dialogConfig);
    this.updateContactList();
    dialogRef.keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Escape'),
        take(1)
      )
      .subscribe(() => dialogRef.close());
  }

  onEditContact(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '57%';
    dialogConfig.width = '30%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    let dialogRef: MatDialogRef<ContactComponent> = this.dialog.open(ContactComponent, dialogConfig);
    this.updateContactList();

    dialogRef.componentInstance.id = row.id;
    dialogRef.componentInstance.name = row.name;
    dialogRef.componentInstance.phoneNumber = row.phoneNumber;
    dialogRef.componentInstance.numberType = row.numberType;
    dialogRef.componentInstance.category = row.category;
    dialogRef.componentInstance.isEditMode = true;

    dialogRef.keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Escape'),
        take(1)
      )
      .subscribe(() => dialogRef.close());
  }

  updateContactList() {
    if (this.dialog) {
      this.dialog.afterAllClosed.subscribe(() => {
        this.contactList = new MatTableDataSource(this.contactService.getContacts());
        this.contactList.sort = this.sort;
        this.contactList.paginator = this.paginator;
      });
    }
  }

  onDeleteContact(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '18%';
    dialogConfig.width = '20%';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    let dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    this.updateContactList();
    dialogRef.componentInstance.id = row.id;
    dialogRef.keydownEvents()
      .pipe(
        filter((e: KeyboardEvent) => e.code === 'Escape'),
        take(1)
      )
      .subscribe(() => dialogRef.close());
  }

}
