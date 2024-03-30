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
  constructor(private service: LoginService, private router: Router) {}

  login(event?: Event) {
    if (event) {
      event.preventDefault();
    }
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
          console.log(error);
          this.login_error = error.error;
        }
      );
  }
}
