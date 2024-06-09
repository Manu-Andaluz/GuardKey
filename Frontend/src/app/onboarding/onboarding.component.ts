import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MasterPasswordService } from '../services/MasterPassword/master-password.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { RefreshTokenService } from '../services/RefreshToken/refresh-token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {
  is_submiting: boolean = false;

  constructor(
    private service: MasterPasswordService,
    private refresh_service: RefreshTokenService,
    private router: Router,
  ) {}

  setMasterPassword(e: Event) {
    this.is_submiting = true;
    e.preventDefault();
    const input = document.getElementById(
      'master_password',
    ) as HTMLInputElement;

    const token = localStorage.getItem('guardkey_session_token') as string;
    const decodedToken = jwtDecode(token) as any;

    if (decodedToken) {
      this.service.postRequest(decodedToken.user_id, input.value).subscribe(
        (response: any) => {
          this.refresh_service.postRequest(token).subscribe((response: any) => {
            localStorage.setItem('guardkey_session_token', response.token);
            this.router.navigateByUrl('/');
          });
        },
        (error: any) => {
          this.is_submiting = false;
          console.log(error);
        },
      );
    }
  }
}
