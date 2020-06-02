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
  private confirmationResult: any;

  constructor() {}

  async initialize(): Promise<void> {
    this.firebaseApp = initializeApp(FIREBASE);

    this.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
    this.recaptchaVerifier.render();
  }

  async getDetail(formGroup: FormGroup): Promise<void> {
    if (formGroup.invalid === false) {
      try {
        const result = await this.firebaseApp
          .auth()
          .signInWithPhoneNumber(formGroup.value.tel, this.recaptchaVerifier);
        this.recaptchaVerifier.reset();
        this.confirmationResult = result;
      } catch (error) {
        this.recaptchaVerifier.reset();
        throw new Error(error);
      }
    }
  }

  async codeVerify(formGroup: FormGroup): Promise<void> {
    try {
      const result = this.confirmationResult.confirm(formGroup.value.code);
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  }
}
