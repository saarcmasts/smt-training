import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-field',
  imports: [],
  templateUrl: './text-field.html',
  styleUrl: './text-field.css'
})
export class TextField {
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
