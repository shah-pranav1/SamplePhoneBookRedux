import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatDialogModule

  ],
  exports: [
    Material.MatInputModule,
    Material.MatFormFieldModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatDialogModule
  ]
})
export class MaterialModule { }
