import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { FormPropertiesModule } from '../form-properties/form-properties.module';
import { AddressControlComponent } from './address-control.component';

@NgModule({
  declarations: [AddressControlComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    FormPropertiesModule
  ],
  exports: [AddressControlComponent],
})
export class AddressControlModule {}
