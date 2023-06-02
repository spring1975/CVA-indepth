import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { debounceTime, throttleTime } from 'rxjs/operators';
import { PhoneNumberValidator } from '../validators/phone-number/phone-number.validator';

@Component({
  selector: 's-phone-number-array',
  templateUrl: './phone-number-array.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberArrayComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneNumberArrayComponent),
      multi: true,
    },
  ],
  styleUrls: [
    './phone-number-array.component.scss'
  ]
    
  
  // Still need to research why the view is funky with OnPush
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberArrayComponent
  implements ControlValueAccessor, Validator
{
  readonly parentForm = this.inj.get(ControlContainer).control;
  phoneArray = this.fb.array<FormControl<string | number | null>>([]);

  isDisabled = false;

  constructor(
    private readonly inj: Injector,
    private readonly fb: FormBuilder
  ) {}

  //#region Validation

  validate(control: FormControl<number | null>): ValidationErrors | null {
    const someInvalid = this.phoneArray.controls?.some((c) => c.invalid);
    let errors = someInvalid ? { phoneArrayInvalid: true } : null;
    if (someInvalid) {
      this.phoneArray.setErrors(errors);
    }
    return errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    fn();
  }
  //#endregion

  //#region CVA
  writeValue(phoneNumbers: number[] | string[] | null): void {
    if (this.isArrayOfStringsOrNumbers(phoneNumbers)) {
      this.phoneArray.clear({ emitEvent: false });

      return phoneNumbers.length > 0
        ? this.generateControlsForArrayItems(phoneNumbers)
        : this.addPhone();
    }
  }

  generateControlsForArrayItems(phoneNumbers: string[] | number[]) {
    for (const e of phoneNumbers) {
      this.addPhone(e);
    }
  }

  isArrayOfStringsOrNumbers(
    phoneNumbers: number[] | string[] | null
  ): phoneNumbers is string[] | number[] {
    return (
      phoneNumbers !== null &&
      phoneNumbers !== undefined &&
      Array.isArray(phoneNumbers) &&
      typeof phoneNumbers !== 'string' &&
      typeof phoneNumbers !== 'number'
    );
  }

  // Placeholder
  onChange = (): void => {};

  registerOnChange(onChange: () => {}): void {
    this.onChange = onChange;
    this.phoneArray.valueChanges
      .pipe(debounceTime(100))
      .subscribe(this.onChange);
  }
  // Placeholder
  onTouched = () => {};

  registerOnTouched(fn: () => {}): void {
    this.onTouched = () => {
      this.parentForm?.markAsTouched();
      fn();
    };
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  trackByFn(index: number, _: AbstractControl) {
    return index;
  }

  //#endregion
  addPhone(p?: string | number | null) {
    const numberOrNull = p != null ? Number(`${p}`) : null;
    this.phoneArray.push(
      this.fb.control<number | null>(numberOrNull, 
        [PhoneNumberValidator],
      )
    );
    this.onTouched();
  }

  removePhone(i: number) {
    this.phoneArray.removeAt(i);
  }
}
