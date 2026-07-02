import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isScrolled = false;
  menuOpen = false;

  constructor(private scrollService: ScrollService) {}

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
