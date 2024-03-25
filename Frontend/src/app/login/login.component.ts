import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/Login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private service: LoginService, private router: Router) {}

  login(event: Event) {
    event.preventDefault();
    const form = document.getElementById('login_form') as HTMLFormElement;
    const formData = new FormData(form) as any;

    this.service
      .postRequest(formData.get('username'), formData.get('password'))
      .subscribe(
        (response: User) => {
          console.log(response);
          localStorage.setItem('guardkey_session_token', response.token);
          // this.router.navigateByUrl('/');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
