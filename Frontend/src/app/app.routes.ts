import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { EntryComponent } from './entry/entry.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-password', component: CreatePasswordComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'entry/:id', component: EntryComponent },
];
