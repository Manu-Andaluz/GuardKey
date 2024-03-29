import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { EntryDetailsService } from '../services/EntryDetails/entry-details.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  constructor(
    private service: EntryDetailsService,
    private route: ActivatedRoute
  ) {}
  entry_id: string = '';
  entry?: Entry;

  getEntry({
    search = this.entry_id,
    decrypt = false,
  }: {
    search?: string;
    decrypt?: boolean;
  }) {
    const token = localStorage.getItem('guardkey_session_token') as string;

    if (token) {
      const decodedToken = jwtDecode(token) as any;

      this.service
        .postRequest({
          decrypt_password: decrypt,
          search: search,
          user_id: decodedToken.user_id,
        })
        .subscribe(
          (response: any) => {
            this.entry = response.data[0];
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getEntry({ search: params['id'] });
      this.entry_id = params['id'];
    });
  }
}
