import { Component, forwardRef, Injector, Input } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number-control.component.html',
  styleUrls: ['./phone-number-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberControlComponent),
      multi: true,
    },
  ],
})
export class PhoneNumberControlComponent implements ControlValueAccessor {
  phone = this.fb.control<number | string | null>(null);

  readonly parentForm = this.inj.get(ControlContainer).control;

  constructor(
    private readonly inj: Injector,
    private readonly fb: FormBuilder
  ) {}

  @Input() required = false;

  ngOnInit() {
    // Initialization logic
  }

  //#region CVA
  writeValue(value?: number | string | null): void {
    // Update the phone number value
  }

  onChange = (): void => {};

  registerOnChange(fn: any): void {
    // Register the callback function for value changes
  }

  onTouched = (): void => {};

  registerOnTouched(fn: any): void {
    // Register the callback function for touch events
  }

  setDisabledState(disabled: boolean): void {
    // Enable or disable the phone number input
  }
  //#endregion CVA

  private formatPhoneNumberForStorage(value: number | string | null): number | null {
    // Format the phone number for storage
  }

  private displayFn = (value?: string | number | null): string | null => {
    // Convert number to formatted string for display
  }

  // Other component methods
}
