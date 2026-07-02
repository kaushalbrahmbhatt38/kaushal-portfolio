import { Component, HostListener, inject } from '@angular/core';
import { ScrollService } from '../../service/scroll/scroll-service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isScrolled = false;
  menuOpen = false;
  private scrollService:ScrollService;

  constructor() {
    this.scrollService = inject(ScrollService);
  }

  ngOnInit(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  scrollTo(elementId: string): void {
    this.menuOpen = false;
    this.scrollService.scrollToElement(elementId);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
