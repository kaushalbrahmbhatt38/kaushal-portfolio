import { Component, AfterViewInit, ElementRef } from '@angular/core';
declare var Isotope: any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements AfterViewInit {
  private isotope: any;
  
  constructor(private elementRef: ElementRef) {}
  
  ngAfterViewInit() {
    // Initialize Isotope
    const portfolioContainer = this.elementRef.nativeElement.querySelector('.portfolio-container');
    if (portfolioContainer) {
      this.isotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
    }
  }
  
  filterItems(filter: string, event: Event) {
    // Remove active class from all filter items
    const filterItems = this.elementRef.nativeElement.querySelectorAll('#portfolio-flters li');
    filterItems.forEach((item: HTMLElement) => {
      item.classList.remove('filter-active');
    });
    
    // Add active class to clicked item
    const clickedItem = event.target as HTMLElement;
    clickedItem.classList.add('filter-active');
    
    // Filter items
    if (this.isotope) {
      this.isotope.arrange({ filter: filter });
    }
  }
}
