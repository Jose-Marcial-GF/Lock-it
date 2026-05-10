import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PasswordDetailPageRoutingModule } from './password-detail-routing.module';
import { PasswordDetailPage } from './password-detail.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PasswordDetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PasswordDetailPage]
})
export class PasswordDetailPageModule {}
