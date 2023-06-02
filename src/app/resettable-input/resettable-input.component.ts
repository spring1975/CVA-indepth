import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Injector,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { noop } from 'rxjs';
import { ControlValueAccessorConnector } from './control-value-accessor-connector';

@Component({
  selector: 'resettable-input',
  // template: `<mat-form-field><input matInput type="text" [formControl]="control"></mat-form-field> <button matButton (click)="clearInput()">clear</button>`,
  templateUrl: 'resettable-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ResettableInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ResettableInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResettableInputComponent
  extends ControlValueAccessorConnector
  implements Validator
{
  constructor(injector: Injector) {
    super(injector);
  }

  //placeholder
  onValidationChange = noop;
  
  _onTouched = noop;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (control.invalid) {
      return { invalid: true };
    } else {
      return null;
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  override writeValue(val: any) {
    this.control.setValue(val);
  }

  clearInput() {
    this.control.setValue('');
  }
}
