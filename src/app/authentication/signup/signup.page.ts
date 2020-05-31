import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhoneValidator } from '../phone.validator';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private signUpFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {
    this.signUpFormGroup = this.formBuilder.group({
      tel: [
        '',
        Validators.compose([Validators.required, PhoneValidator.validate()]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ]),
      ],
    });
  }

  private async onSubmit(): Promise<void> {
    this.signupService.submit(this.signUpFormGroup)
  }

  ngOnInit() {
    this.signupService.initialize();
  }
}
