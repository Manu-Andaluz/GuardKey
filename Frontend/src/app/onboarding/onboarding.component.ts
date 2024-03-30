import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MasterPasswordService } from '../services/MasterPassword/master-password.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {
  constructor(private service: MasterPasswordService, router: Router) {}

  setMasterPassword(e: Event) {
    e.preventDefault();
    const input = document.getElementById(
      'master_password'
    ) as HTMLInputElement;

    const token = localStorage.getItem('guardkey_session_token') as string;
    const decodedToken = jwtDecode(token) as any;

    if (decodedToken) {
      this.service.postRequest(decodedToken.user_id, input.value).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
