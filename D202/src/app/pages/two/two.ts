import { Component } from '@angular/core';
import { NameCard } from "../../components/name-card/name-card";

@Component({
  selector: 'app-two',
  imports: [NameCard],
  templateUrl: './two.html',
  styleUrl: './two.css'
})
export class Two {

  onEdit() {
    console.log('Edit button clicked');
  }

}
