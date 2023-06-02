import { AbstractControl, ValidatorFn } from '@angular/forms';

export const inputIsNotNullOrUndefined = <T>(
  input: null | undefined | T
): input is T => input !== null && input !== undefined;

export const touchControl =
  (control: AbstractControl) => (fn: () => void) => () => {
    fn();
    control.markAllAsTouched();
  };

export const phoneNumberValidator =
  (): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null => {
    if (
      typeof control.value === 'string' ||
      control.value === -1 ||
      control.value === ''
    ) {
      return { required: { value: control.value } };
    }
    return null;
  };

export const formatAsUSPhoneNumber = (
  value: string | number | null | undefined
): string | null => {
  if (value === null || value === undefined) {
    return null;
  }

  if (/^\(?\d{0,3}\)? ?$/.test(`${value}`)) {
    return `${value}`;
  }

  const match = reduceFirstTenDigitsToGroups(value);
  if (match) {
    // Format the matched parts into the desired format
    const areaCode = `(${match.group1 ?? ''})`;
    const prefix = match.group2 ?? '' ? ` ${match.group2}` : '';
    const suffix = match.group3 ?? '' ? `-${match.group3}` : '';

    // Assemble
    return `${areaCode}${prefix}${suffix}`;
  }
  // If the phone number doesn't match the expected format, return the original input
  return `${value}`;
};

export const reduceFirstTenDigitsToGroups = (
  value?: number | string | null
) => {
  const valueAsString = `${value}`;
  // Don't bother with null, undefined, empty strings
  if (isEmpty(value)) {
    return null;
  }

  // Strip down to first 10 digits
  const digitsOnly = `${value}`.replace(/\D/g, '').slice(0, 10);

  const regex = /^(\d{0,3})?(\d{0,3})?(\d{0,4})?$/;

  const match = digitsOnly.match(regex);

  if (match) {
    const [, group1, group2, group3] = match;
    // Return an object of the groupings
    return { group1, group2, group3 };
  }

  // Return null if there was no match (ie non-numeric characters)
  return null;
};

export const isEmpty = (value: unknown): boolean => {
  if (
    value === null ||
    value === undefined ||
    value === 'undefined' ||
    value === 'null'
  ) {
    return true;
  }

  if (typeof value === 'string') {
    return !value.trim().length;
  }
  return false;
};
