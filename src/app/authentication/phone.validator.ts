import { ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';

export class PhoneValidator {
  static validate(): ValidatorFn {
    return (event): { [key: string]: boolean } => {
      if (event.value) {
        try {
          const phoneUtil = PhoneNumberUtil.getInstance();
          const phoneNumber: PhoneNumber = phoneUtil.parseAndKeepRawInput(
            event.value
          );

          if (phoneUtil.isValidNumber(phoneNumber) === true) {
            return {};
          } else {
            throw new Error();
          }
        } catch (error) {
          return {
            validate: false,
          };
        }
      } else {
        return {
          validate: false,
        };
      }
    };
  }
}
