import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Experience } from './components/experience/experience';
import { About } from './components/about/about';
import { Portfolio } from './components/portfolio/portfolio';
import { Education } from './components/education/education';
import { Contact } from './components/contact/contact';
import { BackToTop } from './components/back-to-top/back-to-top';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Sidebar,
    Header,
    Experience,
    About,
    Portfolio,
    Education,
    Contact,
    BackToTop
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Kaushal Brahmbhatt Portfolio');
  currentYear = new Date().getFullYear();
}
