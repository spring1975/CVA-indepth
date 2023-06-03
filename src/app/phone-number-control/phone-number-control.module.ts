import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormPropertiesModule } from '../form-properties/form-properties.module';
import { PhoneNumberControlComponent } from './phone-number-control.component';

@NgModule({
  declarations: [PhoneNumberControlComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FormPropertiesModule
  ],
  exports: [PhoneNumberControlComponent],
})
export class PhoneNumberModule {}
