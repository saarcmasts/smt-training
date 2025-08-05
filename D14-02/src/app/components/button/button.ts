import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {
  @Input() label: string = 'Submit';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
