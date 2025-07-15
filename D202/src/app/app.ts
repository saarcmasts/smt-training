import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  moveToPage2() {
    this.router.navigate(['/two']);
  }


}
