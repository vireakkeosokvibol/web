import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as firebase from "firebase";
import { FIREBASE } from "../../../config.json";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  private signUpFormGroup: FormGroup;
  private firebaseApp: any;
  private recaptchaVerifier: any;

  constructor(private formBuilder: FormBuilder) {
    this.signUpFormGroup = this.formBuilder.group({
      tel: "",
      password: "",
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.signUpFormGroup.invalid === false) {
      try {
        await this.firebaseApp
          .auth()
          .signInWithPhoneNumber(
            this.signUpFormGroup.value.tel,
            this.recaptchaVerifier
          );
        console.log("from success");
      } catch (error) {
        console.log(error);
      }
    }
  }

  ngOnInit() {
    this.firebaseApp = firebase.initializeApp(FIREBASE);
    this.firebaseApp.auth();
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    this.recaptchaVerifier.render();
  }
}
