import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddEntryService } from '../services/AddEntry/add-entry.service';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent {
  constructor(private service: AddEntryService) {}

  getFormData(event: Event) {
    event.preventDefault();
    const form = document.getElementById('add_entry') as HTMLFormElement;

    // Create an empty object to store form data
    const formData = {} as any;

    // Loop through form elements and populate formData object
    form.querySelectorAll('input').forEach((input) => {
      formData[input.id] = input.value;
    });

    console.log(formData);

    this.service.postRequest(formData).subscribe(
      (response: { message: string }) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
