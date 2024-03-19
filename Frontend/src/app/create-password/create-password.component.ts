import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddEntryService } from '../services/AddEntry/add-entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  constructor(private service: AddEntryService, private router: Router) {}

  errors: FormErrors = {
    master_password: '',
    site_name: '',
    email: '',
    password: '',
  };

  validateForm(form: HTMLFormElement | any) {
    let errors = {} as any;

    if (!form.master_password.value) {
      errors.master_password = 'Master password is required';
    }

    if (!form.site_name.value) {
      errors.site_name = 'Site name is required';
    }

    if (!form.email.value) {
      errors.email = 'Email is required';
    }

    if (!form.password.value) {
      errors.password = 'Password is required';
    }

    return errors;
  }

  getFormData(event: Event) {
    event.preventDefault();
    const form = document.getElementById('add_entry') as HTMLFormElement;
    const errors = this.validateForm(form);

    console.log(Object.keys(errors));

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      return;
    }

    const formData = {} as any;

    form.querySelectorAll('input').forEach((input) => {
      formData[input.id] = input.value;
    });

    this.service.postRequest(formData).subscribe(
      (response: { message: string }) => {
        this.router.navigateByUrl('/');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
