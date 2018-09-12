import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTabsModule, MatIconModule, MatSnackBarModule, MatSidenavModule, MatToolbarModule, MatDividerModule } from "@angular/material";

const components = [
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatToolbarModule
];
@NgModule({
  imports: [
    CommonModule,
    ...components
  ],
  exports: [
    ...components
  ],
  declarations: []
})
export class AngularMaterialModule { }
