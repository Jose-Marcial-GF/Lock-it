import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { HeaderComponent } from './header/header.component';
import { PasswordCardComponent } from './password-card/password-card.component';
import { CopyTextareaComponent } from './copy-textarea/copy-textarea.component';


import { LockPasswdComponent } from './lock-passwd/lock-passwd.component';
import { PasswordPreviewComponent } from './password-preview/password-preview.component';
import { PasswordListComponent } from './password-list/password-list.component';

@NgModule({
  declarations: [
    CustomInputComponent,
    HeaderComponent,
    PasswordCardComponent,
    CopyTextareaComponent,
    LockPasswdComponent,
    PasswordPreviewComponent,
    PasswordListComponent
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
    HeaderComponent,
    PasswordCardComponent,
    CopyTextareaComponent,
    LockPasswdComponent,
    PasswordPreviewComponent,
    PasswordListComponent
  ]
})
export class ComponentsModule { }
