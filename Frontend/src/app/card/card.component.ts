import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteEntryService } from '../services/DeleteEntry/delete-entry.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() image_link: string = '';
  @Input() website_name: string = '';
  @Input() website_url: string = '';
  @Input() password_quantity: number = 1;
  @Input() item_id?: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor(private service: DeleteEntryService) {}

  deleteEntry(search: string) {
    this.service.deleteRequest('masteradmin123!', search).subscribe(
      (response: { data: Entry }) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
