import { Component } from '@angular/core';

interface TimelineNode {
  period: string;
  company: string;
  role: string;
  location: string;
  highlights: string[];
  tags: string[];
}

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  activeNode = -1;
  nodeCardTransform = 'perspective(800px) rotateY(0deg) translateZ(20px)';

  timelineNodes: TimelineNode[] = [
    {
      period: 'July 2022 — Present',
      company: 'Salesforce.com',
      role: 'Senior Technical Support Engineer — Sales Cloud Signature Support',
      location: 'Hyderabad, India',
      highlights: [
        'Troubleshoot high-impact system anomalies across enterprise Salesforce orgs',
        'Implementing new functionalities and resolving Bug in Salesforce ecosystem',
        'Build custom applications using Apex, LWC, Flows, and CRM Analytics',
        'Perform root cause analysis leveraging Splunk and advanced debugging tools',
        'Act as technical consultant and architect for complex Sales Cloud implementations'
      ],
      tags: ['Apex', 'LWC', 'Flows', 'CRM Analytics', 'Agentforce', 'Sales Cloud', 'Metadata API', 'Rest/SOAP/Bulk API', 'SOQL/SOSL', 'Deployments']
    },
    {
      period: 'Oct 2020 — July 2022',
      company: 'Tata Consultancy Services',
      role: 'Assistant System Engineer',
      location: 'Gandhinagar, India',
      highlights: [
        'Architected microservice API structures and modular plug-and-play frameworks',
        'Built synchronization engines and payment modules for enterprise platforms',
        'Led Agile/Scrum delivery as part of the module leaders team',
        'Designed and integrated microservice APIs, ensuring successful implementation at scale',
        'Mentored team members while driving full-stack development initiatives'
      ],
      tags: ['Java', 'Spring Boot', 'Microservices', 'Angular', 'REST APIs', 'PostgreSQL', 'Agile', 'Scrum']
    }
  ];
}
