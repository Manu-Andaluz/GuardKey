import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { EntryDetailsService } from '../services/EntryDetails/entry-details.service';
import { ActivatedRoute } from '@angular/router';

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
    this.service
      .postRequest({
        master_password: 'masteradmin123!',
        decrypt_password: decrypt,
        search: search,
      })
      .subscribe(
        (response: any) => {
          this.entry = response.data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.getEntry({ search: params['id'] });
      this.entry_id = params['id'];
    });
  }
}
