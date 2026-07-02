import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.css',
})
export class BackToTop {
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
