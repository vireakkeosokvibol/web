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
  signupFormGroup: FormGroup;
  codeVerifyFormGroup: FormGroup;
  step: number;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {
    this.signupFormGroup = this.formBuilder.group({
      tel: [
        '',
        Validators.compose([Validators.required, PhoneValidator.validate()]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(6),
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{8,}'),
        ]),
      ],
    });

    this.codeVerifyFormGroup = this.formBuilder.group({
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{6}$'),
        ]),
      ],
    });
  }

  async onSubmit(action: string): Promise<void> {
    switch (action) {
      case 'getDetail':
        await this.signupService.getDetail(this.signupFormGroup);
        this.step = 2;
        break;
      case 'verifyCode':
        await this.signupService.codeVerify(this.codeVerifyFormGroup, {
          tel: this.signupFormGroup.value.tel,
          password: this.signupFormGroup.value.password,
        });
        break;
      default: {
        throw new Error('No form action detected!');
      }
    }
  }

  ngOnInit(): void {
    this.signupService.initialize();
  }
}
