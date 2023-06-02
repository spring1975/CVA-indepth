import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CodeBlockModule } from '../code-block/code-block.module';
import { FormPropertiesComponent } from './form-properties.component';

@NgModule({
  declarations: [FormPropertiesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CodeBlockModule
  ],
  exports: [FormPropertiesComponent],
})
export class FormPropertiesModule {}
