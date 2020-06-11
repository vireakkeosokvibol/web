import { Component, OnInit } from '@angular/core';
import { SigninService } from './signin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;

  constructor(
    private signinService: SigninService,
    private formBuilder: FormBuilder
  ) {
    this.signinForm = this.formBuilder.group({
      account: '',
      password: ''
    });
  }

  async signinFormSubmit(): Promise<void> {

  }

  ngOnInit() {}
}
