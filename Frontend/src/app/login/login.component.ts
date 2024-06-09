import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/Login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login_error?: string;
  errors: {
    username?: string;
    password?: string;
  } = {};
  is_submiting: boolean = false;

  constructor(
    private service: LoginService,
    private router: Router,
  ) {}

  validateForm() {
    const form = document.getElementById('login_form') as HTMLFormElement;
    const formData = new FormData(form) as any;

    if (!formData.get('username')) {
      this.errors.username = 'Username required';
    } else {
      this.errors.username = undefined;
    }

    if (!formData.get('password')) {
      this.errors.password = 'Password required';
    } else {
      this.errors.password = undefined;
    }
  }

  login(event?: Event) {
    this.is_submiting = true;

    if (event) {
      event.preventDefault();
    }
    this.validateForm();

    if (!this.errors.username && !this.errors.password) {
      const form = document.getElementById('login_form') as HTMLFormElement;
      const formData = new FormData(form) as any;

      this.service
        .postRequest(formData.get('username'), formData.get('password'))
        .subscribe(
          (response: User) => {
            localStorage.setItem('guardkey_session_token', response.token);
            this.router.navigateByUrl('/');
          },
          (error: any) => {
            this.is_submiting = false;
            this.login_error = error.error;
          },
        );
    } else {
      this.is_submiting = false;
      return;
    }
  }
}
