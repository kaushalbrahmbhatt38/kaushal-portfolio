import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kaushal-portfolio';

  constructor(private httpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.httpService.authenticateWithConfig();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }
}
