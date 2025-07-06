import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScrollService } from 'src/app/services/scroll/scroll.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('typedTarget') typedTarget!: ElementRef;
  @ViewChild('typedSource') typedSource!: ElementRef;

  constructor(private scrollService: ScrollService) {}
  
  ngAfterViewInit() {
    if (this.typedTarget && this.typedSource) {
      const typedStrings = this.typedSource.nativeElement.textContent;
      
      new Typed(this.typedTarget.nativeElement, {
        strings: typedStrings.split(', '),
        typeSpeed: 100,
        backSpeed: 20,
        smartBackspace: false,
        loop: true
      });
    }
  }

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }
}
