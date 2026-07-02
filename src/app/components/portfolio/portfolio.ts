import { Component } from '@angular/core';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  icon: string;
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  activeProject = -1;

  projects: Project[] = [
    {
      title: 'Salesforce Sales Cloud Signature Support',
      subtitle: 'Full-stack engineering and technical architecture for enterprise CRM systems',
      description: 'Architected and supported mission-critical CRM solutions for enterprise clients. Diagnosed & Fixed complex production bugs. Translated high-level business goals into scalable technical enhancements.',
      tech: ['Apex', 'LWC', 'Flows', 'CRM Analytics', 'Agentforce', 'SOQL/SOSL', 'Rest/SOAP/Bulk API', 'Metadata Deployment'],
      icon: 'fa fa-landmark'
    },
    {
      title: 'Paid Family Medical Leave (PFML)',
      subtitle: 'Tata Consultancy Services | Microservice Architecture Product',
      description: 'Designed and engineered a microservice-based US Government policy product from scratch. Built highly flexible, reusable synchronization and payment modules while leading cross-functional Agile teams to ensure successful, scalable delivery.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AngularJS', 'Microservices', 'REST API', 'Agile/Scrum'],
      icon: 'fa fa-landmark'
    },
    {
      title: 'My Vehicle Shop',
      subtitle: 'Cross-Platform E-Commerce Engine',
      description: 'An automated, cross-platform E-Commerce web and mobile engine featuring smart inventory management. Enables end-users to purchase vehicles from home, reducing paperwork and saving customer time.',
      tech: ['MeteorJS', 'Node.js', 'MongoDB', 'Automation'],
      icon: 'fa fa-car'
    },
    {
      title: 'IVPBS',
      subtitle: 'Industrial Visit Planning System',
      description: 'A paperless digital platform built to optimize planning and real-time booking logistics for academic institutions. Serves colleges and students organizing industrial visits seamlessly.',
      tech: ['Web Platform', 'Booking Engine', 'Real-time Logistics'],
      icon: 'fa fa-graduation-cap'
    }
  ];
}
