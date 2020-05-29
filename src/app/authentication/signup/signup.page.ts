import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { FIREBASE } from '../../../config.json';
import { PhoneValidator } from '../phone.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private signUpFormGroup: FormGroup;
  private firebaseApp: any;
  private recaptchaVerifier: any;

  constructor(private formBuilder: FormBuilder) {
    this.signUpFormGroup = this.formBuilder.group({
      tel: [
        '',
        Validators.compose([Validators.required, PhoneValidator.validate()]),
      ],
      password: '',
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.signUpFormGroup.invalid === false) {
      try {
        const result = await this.firebaseApp
          .auth()
          .signInWithPhoneNumber(
            this.signUpFormGroup.value.tel,
            this.recaptchaVerifier
          );
        console.log(result);
        this.recaptchaVerifier.reset();
      } catch (error) {
        this.recaptchaVerifier.reset();
        console.log(error);
      }
    }
  }

  ngOnInit() {
    this.firebaseApp = firebase.initializeApp(FIREBASE);
    this.firebaseApp.auth();
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );
    this.recaptchaVerifier.render();
  }
}
