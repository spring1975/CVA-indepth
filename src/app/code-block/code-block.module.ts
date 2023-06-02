import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CodeBlockComponent } from './code-block.component';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [
    CommonModule
  ],
  exports: [CodeBlockComponent],
})
export class CodeBlockModule {}
