import { Component } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isNavbarCollapsed = true;

  constructor(private scrollService: ScrollService) {}

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
