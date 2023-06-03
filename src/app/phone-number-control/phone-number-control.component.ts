/* eslint-disable @typescript-eslint/member-ordering */
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  FormBuilder,
} from '@angular/forms';
import { Component, Input, OnInit, forwardRef, Injector } from '@angular/core';
import { map, distinctUntilChanged, tap, throttleTime, debounceTime } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { formatAsUSPhoneNumber } from '../utilities';
import { PhoneNumberValidator } from '../validators/phone-number/phone-number.validator';
import equals from 'fast-deep-equal';

@UntilDestroy()
@Component({
  selector: 's-phone-number-control',
  templateUrl: './phone-number-control.component.html',
  styleUrls: ['./phone-number-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberControlComponent),
      multi: true,
    }
  ],
  // Still need to research why the view is funky with OnPush
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneNumberControlComponent
  implements ControlValueAccessor
{

  @Input() required = true;

  phone = this.fb.control<number | string | null>(null, [PhoneNumberValidator]);

  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(
    private readonly inj: Injector,
    private readonly fb: FormBuilder
  ) {
  }
  //#region CVA


  writeValue(value?: number | string | null): void {
    this.phone.setValue(this.formatPhoneNumberForDisplay(value), {
      emitEvent: false,
    });
  }

  // Placeholder
  onChange = (): void => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.phone.valueChanges
      .pipe(
        tap(console.log),
        distinctUntilChanged(equals),
        tap(() => this.parentForm?.markAsDirty()),
        tap((value) => this.writeValue(value)),
        map((v) => this.formatPhoneNumberForOutput(v)),
        untilDestroyed(this)
      )
      .subscribe(this.onChange);
  }

  // Placeholder
  onTouched = () => {};

  registerOnTouched(fn: any) {
    this.onTouched = () => {
      this.parentForm?.markAsTouched();
      fn();
    };
  }

  disabled = false;

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  //#endregion

  /**
   * Intended storage is numbers only
   */
  private formatPhoneNumberForOutput(
    value: number | string | null
  ): number | null {
    const allDigits = `${value}`.replace(/\D/g, '').slice(0,10);
    return allDigits === '' ? null : Number(allDigits);
  }

  /**
   * Converts number to formated string for display
   */
  private formatPhoneNumberForDisplay = (value?: string | number | null): string | null =>
    formatAsUSPhoneNumber(value);
}
