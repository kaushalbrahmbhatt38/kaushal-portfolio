import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Remove active class from all nav items
      const navItems = document.querySelectorAll('.navbar-nav .nav-link');
      navItems.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked nav item
      const clickedNavItem = document.querySelector(`a[href="#${elementId}"]`);
      if (clickedNavItem) {
        clickedNavItem.classList.add('active');
      }
      
      // Smooth scroll to element
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }
}
