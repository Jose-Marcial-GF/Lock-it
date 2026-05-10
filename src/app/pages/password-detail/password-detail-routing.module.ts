import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordDetailPage } from './password-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordDetailPageRoutingModule {}
