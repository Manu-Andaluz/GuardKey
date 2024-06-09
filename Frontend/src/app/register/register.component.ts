import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegisterService } from '../services/Register/register.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  register_error?: string;
  errors: {
    username?: string;
    email?: string;
    password?: string;
  } = {};
  is_submiting: boolean = false;

  constructor(
    private service: RegisterService,
    private router: Router,
  ) {}

  validateForm() {
    const form = document.getElementById('register_form') as HTMLFormElement;
    const formData = new FormData(form) as any;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = formData.get('email');
    console.log(email, 'email', emailRegex.test(email));

    if (!formData.get('username')) {
      this.errors.username = 'Username required';
    } else {
      this.errors.username = undefined;
    }

    if (!email || emailRegex.test(email) === false) {
      this.errors.email = 'Email required';
    } else {
      this.errors.email = undefined;
    }

    if (!formData.get('password')) {
      this.errors.password = 'Password required';
    } else {
      this.errors.password = undefined;
    }
  }

  register(e?: Event) {
    this.is_submiting = true;

    if (e) {
      e.preventDefault();
    }

    this.validateForm();

    if (!this.errors.username && !this.errors.email && !this.errors.password) {
      const form = document.getElementById('register_form') as HTMLFormElement;
      const formData = new FormData(form) as any;
      const object = {} as any;
      formData.forEach((value: string, key: number) => (object[key] = value));

      this.service.postRequest(object).subscribe(
        (response: any) => {
          localStorage.setItem('guardkey_session_token', response.token);
          this.router.navigateByUrl('/');
        },
        (error: any) => {
          this.is_submiting = false;
          console.log(error);
          this.register_error = error.error;
        },
      );
    } else {
      this.is_submiting = false;
      return;
    }
  }
}
