import { AbstractControl } from '@angular/forms';

export const phoneNumberErrorKey = 'wrongFormat';

export const PhoneNumberValidator = (
  control?: AbstractControl
): { [key: string]: boolean } | null => {
  const value = control?.value;
  if (Array.isArray(value)) {
    const hasError = value.some((control) => PhoneNumberValidation(control));
    return hasError ? { [phoneNumberErrorKey]: true } : null;
  }

  return PhoneNumberValidation(value) ? { [phoneNumberErrorKey]: true } : null;
};

export const PhoneNumberValidation = (phoneNumber: number) => {
  // Regex from Aya.Core.Api\Aya.Core.DTO\Validation\PhoneValidateAttribute.cs
  const phoneNumberRegExp = RegExp(
    /^\(?([2-9][0-8][0-9])\)?[-. ]*([2-9][0-9]{2})[-. ]*([0-9]{4})$/
  );

  // Phone mask prevents entry of non-digit characters, but validation fires before
  // phone mask logic, so strip out all non-digit characters before validating to
  // prevent false positive validation failures due to non-digit input(s).
  const phoneNumberAsString = `${phoneNumber}`.replace(/\D/g, '');

  return phoneNumberAsString && !phoneNumberRegExp.test(phoneNumberAsString);
};
