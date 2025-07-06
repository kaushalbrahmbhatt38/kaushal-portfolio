// back-to-top.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  template: `<a [class.show]="isVisible" (click)="scrollToTop()" class="back-to-top"><i class="fa fa-angle-double-up"></i></a>`,
  styles: [`
    .back-to-top {
      display: none;
    }
    .back-to-top.show {
      display: block;
    }
  `]
})
export class BackToTopComponent {
  isVisible = false;
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 100;
  }
  
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}