import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PostService } from '../services/post.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CardComponent, NavbarComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private service: PostService, private route: ActivatedRoute) {}
  entries: Entry[] = [];
  card_modal_entry?: Entry;
  @ViewChild('card_modal') cardModal!: ElementRef;

  testPost() {
    this.service
      .examplePost({
        master_password: 'masteradmin123!',
        decrypt_password: false,
      })
      .subscribe(
        (response: { data: Entry[] }) => {
          this.entries = response.data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {
    this.testPost(); // Call testPost() when the component is initialized
  }

  openModal = (card_entry: Entry): void => {
    this.card_modal_entry = card_entry;
    const modalElement = this.cardModal.nativeElement as HTMLDialogElement;
    modalElement.open = true;
  };

  closeModal = (): void => {
    const modalElement = this.cardModal.nativeElement as HTMLDialogElement;
    modalElement.classList.add('close');
    const animationEndHandler = (event: any) => {
      modalElement.close();
      modalElement.classList.remove('close');
      modalElement.removeEventListener('animationend', animationEndHandler);
    };
    modalElement.addEventListener('animationend', animationEndHandler);

    setTimeout(() => {
      modalElement.classList.add('open');
    });
  };
}
