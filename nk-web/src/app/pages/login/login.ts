import { Component } from '@angular/core';
import { TextField } from "../../components/form/text-field/text-field";
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-login',
  imports: [TextField, Button],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
