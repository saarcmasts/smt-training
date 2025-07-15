import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-name-card',
  imports: [],
  templateUrl: './name-card.html',
  styleUrl: './name-card.css'
})
export class NameCard {

  @Input() name: string = '';
  @Input() age: number = 0;

  @Output() onEdit: EventEmitter<void> = new EventEmitter();

  showAlert(){
    alert(`Name: ${this.name}, Age: ${this.age}`);
  }

}
