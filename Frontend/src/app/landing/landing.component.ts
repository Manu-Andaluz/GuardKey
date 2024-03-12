import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CardComponent, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private service: PostService) {}

  testPost() {
    this.service.examplePost('Hello from the frontend').subscribe(
      (response: any) => {
        console.log('Response:', response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
