import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTabsModule, MatIconModule, MatSnackBarModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatCardModule, MatExpansionModule, MatSelectModule } from "@angular/material";

const components = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
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
