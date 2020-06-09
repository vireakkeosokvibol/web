import { Injectable } from '@angular/core';
import { initializeApp, auth } from 'firebase/app';
import 'firebase/auth';
import { FIREBASE } from 'src/config.json';
import { FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private recaptchaVerifier: any;
  private firebaseApp: any;
  private confirmationResult: any;

  constructor(private apollo: Apollo, private router: Router) {}

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

        this.confirmationResult = result;

        this.recaptchaVerifier.reset();
      } catch (error) {
        this.recaptchaVerifier.reset();
        throw new Error(error);
      }
    }
  }

  async codeVerify(
    formGroup: FormGroup,
    param: { tel: string; password: string }
  ): Promise<void> {
    this.confirmationResult
      .confirm(formGroup.value.code)
      .then(async () => {
        let firebaseToken: string;
        try {
          firebaseToken = await auth().currentUser.getIdToken(true);
        } catch (error) {
          throw new Error();
        }

        this.apollo
          .mutate<{ users: { token: string } }>({
            mutation: gql`
              mutation users(
                $tel: String!
                $password: String!
                $firebaseToken: String!
              ) {
                users(
                  signup: {
                    tel: $tel
                    password: $password
                    firebaseToken: $firebaseToken
                  }
                ) {
                  code
                  message
                  token
                }
              }
            `,
            variables: {
              tel: param.tel,
              password: param.password,
              firebaseToken,
            },
          })
          .subscribe(
            ({ data }) => {
              if (!data.users.token) {
                throw new Error('error token not found!');
              }
              window.localStorage.setItem('token', data.users.token);
              this.router.navigate(['/']);
            },
            (error) => {
              throw new Error(error);
            }
          );
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
