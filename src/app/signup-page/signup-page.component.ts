import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SteamService } from '../steam.service';
@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  providers: [AuthServiceService, SteamService],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  authservice = inject(AuthServiceService);
  steamService = inject(SteamService);
  router = inject(Router);
  submitForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,}$/
      ),
    ]),
    steamId: new FormControl('', [Validators.required ]),
  });
  response: string = '';

  get email() {
    return this.submitForm.get('email');
  }

  get password() {
    return this.submitForm.get('password');
  }

  submitSignUp() {
    this.response = "";
    this.authservice.submit(this.submitForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        if (error.status == 404) {
          this.response = 'Steam Id is invalid';
        }
        if (error.status >= 500) {
          if (error.error.detail.includes('DuplicateEmail')) {
            this.response = 'That email is already taken, please specify another email';
          } else {
            this.response = 'There was a problem with the server';
          }
        }
      },
    });
  }
}
