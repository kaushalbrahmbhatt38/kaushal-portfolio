import { Component } from '@angular/core';

interface Badge {
  title: string;
  type: string;
  icon: string;
}

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  hoveredBadge = -1;

  badges: Badge[] = [
    { title: 'Certified Administrator', type: 'Salesforce', icon: 'fa fa-shield-alt' },
    { title: 'Platform Developer I', type: 'Salesforce', icon: 'fa fa-code' },
    { title: 'Sales Cloud Consultant', type: 'Salesforce', icon: 'fa fa-cloud' },
    { title: 'Platform App Builder', type: 'Salesforce', icon: 'fa fa-cubes' },
    { title: 'Advanced Administrator', type: 'Salesforce', icon: 'fa fa-star' },
    { title: 'AI Associate', type: 'Salesforce', icon: 'fa fa-robot' },
    { title: 'Agentforce Specialist', type: 'Salesforce', icon: 'fa fa-bolt' }
  ];
}
