import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  handleClick(): void {
    this.onClick.emit();
  }
}
