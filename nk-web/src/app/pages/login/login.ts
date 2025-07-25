import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// import { TextField } from "../../components/form/text-field/text-field";
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('email', [Validators.required, Validators.email]),
      password: new FormControl('password', [Validators.required])
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login submitted:', { email, password });
      const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginId: email, password })
      });

      console.log('Response status:', response.status);

    } else {
      console.error('Form is invalid');
    }
  }

}
