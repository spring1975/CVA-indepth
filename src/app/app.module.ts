import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {InputFormExample} from './input-form-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { ResettableInputComponent } from './resettable-input/resettable-input.component';
import { PhoneNumberArrayModule } from './phone-number-array/phone-number-array.module';
import { FormPropertiesModule } from './form-properties/form-properties.module';
import { CodeBlockModule } from './code-block/code-block.module';
import { AddressControlModule } from './address/address-control.module';

@NgModule({
  declarations: [InputFormExample, ResettableInputComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    PhoneNumberModule,
    PhoneNumberArrayModule,
    FormPropertiesModule,
    CodeBlockModule,
    AddressControlModule
  ],
  providers: [],
  bootstrap: [InputFormExample],
})
export class AppModule {}
