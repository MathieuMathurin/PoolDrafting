import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTabsModule, MatIconModule, MatSnackBarModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatCardModule, MatExpansionModule, MatSelectModule, MatProgressSpinnerModule, MatChipsModule, MatDialogModule } from "@angular/material";

const components = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
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
