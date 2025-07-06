import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  
  constructor(private elementRef: ElementRef,
    private scrollService: ScrollService
  ) {}
  
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = this.elementRef.nativeElement.querySelectorAll('.progress-bar');
          progressBars.forEach((bar: HTMLElement) => {
            const width = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = width;
          });
          // Once animation is triggered, disconnect the observer
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
    // Observe the skills section
    const skillsElement = this.elementRef.nativeElement.querySelector('.skills');
    if (skillsElement) {
      observer.observe(skillsElement);
    }
  }

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }
}
