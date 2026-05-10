import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CustomInputComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
