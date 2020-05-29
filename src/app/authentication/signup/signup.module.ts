import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup.page';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

const routes: Routes = [
  {
    path: '',
    component: SignupPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    LayoutsModule,
  ],
  declarations: [SignupPage],
})
export class SignupPageModule {}
