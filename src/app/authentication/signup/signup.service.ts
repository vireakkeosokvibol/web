import { Injectable } from '@angular/core';
import { initializeApp, auth } from 'firebase';
import { FIREBASE } from '../../../config.json';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private recaptchaVerifier: any;
  private firebaseApp: any;

  constructor() {}

  async initialize(): Promise<void> {
    this.firebaseApp = initializeApp(FIREBASE);

    this.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
    this.recaptchaVerifier.render();
  }

  async submit(formGroup: FormGroup): Promise<void> {
    if (formGroup.invalid === false) {
      let verificationId: string;
      try {
        const result = await this.firebaseApp
          .auth()
          .signInWithPhoneNumber(formGroup.value.tel, this.recaptchaVerifier);
        verificationId = result.verificationId;
        this.recaptchaVerifier.reset();
      } catch (error) {
        this.recaptchaVerifier.reset();
        throw new Error(error);
      }
      try {
      } catch (error) {}
    }
  }
}
