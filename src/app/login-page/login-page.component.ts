import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [AuthServiceService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  response: string = '';
  authservice = inject(AuthServiceService);
  router = inject(Router);

 

  submitLogin() {
    console.log(this.loginForm.value)
    this.authservice.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
     

      },
      error: (error) => {
        if (error.status == 401) {
          this.response = 'Unauthorized';
        } else {
          this.response = 'Problem with server';
        }
      },
    });
  }
}
