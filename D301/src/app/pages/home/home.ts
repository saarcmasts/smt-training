import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  inputValue: string = '';

  onClick() {
    console.log('Button clicked!');
    console.log('Input value:', this.inputValue);
    this.router.navigate(['/result'], { queryParams: { input: this.inputValue } });
  }

}
