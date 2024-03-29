import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegisterService } from '../services/Register/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private service: RegisterService, private router: Router) {}

  register(e: Event) {
    e.preventDefault();
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
        console.log(error);
      }
    );
  }
}
