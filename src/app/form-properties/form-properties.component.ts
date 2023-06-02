/* eslint-disable @typescript-eslint/member-ordering */
import {
  AbstractControl,
  FormGroup,
FormArray,
FormControl,
} from '@angular/forms';
import { Component, Input } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 's-form-properties',
  templateUrl: './form-properties.component.html',
  styleUrls: ['./form-properties.component.scss']
})
export class FormPropertiesComponent {
  
  


readonly formProperties = ['disabled','enabled','pristine','dirty','pending','touched','untouched','updateOn','invalid','valid','status']

  @Input() form: FormGroup<any> | FormArray<any> | FormControl<any>;
  @Input() title: string;
  
  formPropertyValue(form: AbstractControl, p: string) {
    return form[p as keyof AbstractControl];
  }

  constructor(
  ) {
  }

}
