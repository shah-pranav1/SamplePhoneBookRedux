import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { StoreModule } from '@ngrx/store';
import { contactListReducer } from './contact-list/store/contact-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({contactList: contactListReducer}),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ContactComponent, ConfirmDialogComponent]
})
export class AppModule { }
