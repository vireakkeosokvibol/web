import { Component, OnInit } from '@angular/core';
import { SigninService } from './signin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
  signInForm;

  constructor(
    private signinService: SigninService,
    private formBuilder: FormBuilder
  ) {
    this.signInForm = this.formBuilder.group({
      account: '',
      password: ''
    });
  }

  ngOnInit() {}
}
