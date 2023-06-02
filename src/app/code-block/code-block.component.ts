import { Component, Input, VERSION } from '@angular/core';

@Component({
  selector: 's-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent {
  @Input() title:string;
}
