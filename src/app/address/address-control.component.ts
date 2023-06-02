import { Component, forwardRef, Input, VERSION } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { FormGroupOf } from '../utility-types';
import { ZipCodeValidator } from '../validators/zip-code/zip-code.validator';

export interface Address {
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
}
@Component({
  selector: 's-address-control',
  templateUrl: './address-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressControlComponent),
      multi: true,
    },
  ],
})
export class AddressControlComponent
  implements ControlValueAccessor, Validator
{
  constructor(private readonly fb: FormBuilder) {}

  //#region Validation

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let someInvalid = false;
    Object.keys(this.address.controls).forEach((c) => {
      if (someInvalid === true) {
        return;
      }

      someInvalid =
        this.address.controls[c as keyof FormGroupOf<Address>].invalid;
    });

    let errors = someInvalid ? { addressInvalid: true } : null;
    if (someInvalid) {
      this.address.setErrors(errors);
    }
    return errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    fn();
  }
  //#endregion Validation

  address: FormGroup<FormGroupOf<Address>> = this.initForm();

  initForm(address?: Address) {
    const form = this.fb.group<FormGroupOf<Address>>({
      address1: this.fb.control<string | null>(address?.address1 ?? null),
      address2: this.fb.control<string | null>(address?.address2 ?? null),
      city: this.fb.control<string | null>(address?.city ?? null),
      state: this.fb.control<string | null>(address?.state ?? null),
      postalCode: this.fb.control<string | null>(
        address?.postalCode ?? null,
        ZipCodeValidator
      ),
    });

    this.address = form;
    return form;
  }
  //#region CVA
  writeValue(address?: Address): void {
    if (address) {
      this.address.setValue(address, {
        emitEvent: false,
      });
    }
  }
  // Placeholder
  onChange = (): void => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.address.valueChanges.subscribe(this.onChange);
  }
  // Placeholder
  onTouched = () => {};

  registerOnTouched(fn: any) {
    this.onTouched = () => {
      this.address?.markAsTouched();
      fn();
    };
  }

  disabled = false;

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  //#endregion CVA
}
