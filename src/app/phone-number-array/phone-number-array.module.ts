import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormPropertiesModule } from '../form-properties/form-properties.module';
import { PhoneNumberModule } from '../phone-number/phone-number.module';
import { PhoneNumberArrayComponent } from './phone-number-array.component';

@NgModule({
  declarations: [PhoneNumberArrayComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    PhoneNumberModule,
    FormPropertiesModule
  ],
  exports: [PhoneNumberArrayComponent],
})
export class PhoneNumberArrayModule {}
