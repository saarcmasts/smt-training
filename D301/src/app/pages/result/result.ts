import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blue } from "../../components/blue/blue";
import { Green } from "../../components/green/green";

@Component({
  selector: 'app-result',
  imports: [Blue, Green],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result {

  route: ActivatedRoute;

  input = signal('');
  isOdd = signal(null);

  constructor(route: ActivatedRoute) {
    this.route = route;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.input.set(params['input'] || '');
      this.checkIfOdd();
    });
  }

  async checkIfOdd() {
    const res = await (await fetch('http://localhost:3000?input=' + this.input())).json();
    console.log('Response:', res);
    this.isOdd.set(res.isOdd);
  }

}
