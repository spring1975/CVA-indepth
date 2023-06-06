import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FormGroupOf } from './utility-types';
import { PhoneNumberValidator } from './validators/phone-number/phone-number.validator';

interface Address {
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
}
interface PersonalInfo {
  company: string | null;
  firstName: string;
  lastName: string;
  address: Address;
  singlePhone: number | null;
  phoneArray: number[];
}

export { AbstractControl } from '@angular/forms';

/**
 * @title Inputs in a form
 */
@Component({
  selector: 'input-form-example',
  templateUrl: 'input-form-example.html',
  styleUrls: ['input-form-example.css'],
  // Still need to research why this the view is funky with OnPush
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFormExample implements AfterViewInit, OnInit {
  readonly exampleForm = this.fb.group<FormGroupOf<PersonalInfo>>({
    company: this.fb.control<string | null>(null),
    firstName: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    lastName: this.fb.nonNullable.control('', Validators.required),
    address: this.fb.nonNullable.control<Address>({
      address1: null,
      address2: null,
      city: null,
      state: null,
      postalCode: null,
    }),
    singlePhone: this.fb.control<number | null>(null, PhoneNumberValidator),
    phoneArray: this.fb.nonNullable.control<number[]>([], PhoneNumberValidator),
  });

  constructor(private readonly fb: FormBuilder) {
    console.clear();
  }

  isTouchedColor() {
    return this.exampleForm.touched ? 'green' : 'red';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  patchSomeValues() {
    this.exampleForm.patchValue({
      company: 'Aya Healthcare',
      firstName: 'Tom',
      lastName: 'Smith',
      address: {
        address1: '12345 N Main St',
        address2: '',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94043',
      },
      singlePhone: 5555221222,
      phoneArray: [2223334444, 8884449999, 3332220000],
    });
    this.exampleForm.markAsPristine();
  }
}
