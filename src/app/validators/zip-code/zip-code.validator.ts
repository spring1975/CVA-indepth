import { AbstractControl } from '@angular/forms';

export const zipCodeErrorKey = 'wrongFormat';

export const ZipCodeValidator = (
    control: AbstractControl
): { [key: string]: boolean } | null => {
    const zipCodeRegExp = RegExp(/^\d{5}(?:[-\s]*\d{4})?$/);

    return control.value && !zipCodeRegExp.test(control.value.trim())
        ? {
              [zipCodeErrorKey]: true
          }
        : null;
};