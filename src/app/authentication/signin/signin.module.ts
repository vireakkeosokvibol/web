import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SigninPage } from './signin.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

const routes: Routes = [
  {
    path: '',
    component: SigninPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LayoutsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
