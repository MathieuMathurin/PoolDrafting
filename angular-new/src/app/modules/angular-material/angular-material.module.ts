import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatFormFieldModule, MatButtonModule, MatTabsModule } from "@angular/material";

const components = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule
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
