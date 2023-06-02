import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormPropertiesModule } from '../form-properties/form-properties.module';
import { PhoneNumberComponent } from './phone-number.component';

@NgModule({
  declarations: [PhoneNumberComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FormPropertiesModule
  ],
  exports: [PhoneNumberComponent],
})
export class PhoneNumberModule {}
