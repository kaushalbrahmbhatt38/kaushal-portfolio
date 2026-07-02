import { Component } from '@angular/core';

interface SkillCluster {
  title: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  hoveredSkill = '';
  orbitTransform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';

  skillClusters: SkillCluster[] = [
    {
      title: 'Salesforce Ecosystem',
      icon: 'fab fa-salesforce',
      skills: ['AgentForce', 'Data Cloud', 'APEX', 'LWC', 'Triggers', 'SOQL/SOSL', 'Flows', 'Integration', 'Metadata API', 'Rest/SOAP API', 'Bulk V1/V2 API', 'Deployments', 'Admin Configurations', 'Sales Cloud']
    },
    {
      title: 'Backend Frameworks',
      icon: 'fa fa-server',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Node.js', 'Python', 'Flask']
    },
    {
      title: 'Frontend Frameworks',
      icon: 'fa fa-laptop-code',
      skills: ['Angular', 'React']
    },
    {
      title: 'Databases & Tools',
      icon: 'fa fa-database',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL']
    }
  ];

  floatingTags = [
    { label: 'Cloud', x: 8, y: 15, delay: '0s' },
    { label: 'Scale', x: 85, y: 20, delay: '1s' },
    { label: 'Apex', x: 12, y: 75, delay: '2s' },
    { label: 'API', x: 78, y: 70, delay: '0.5s' },
    { label: 'LWC', x: 45, y: 8, delay: '1.5s' },
    { label: 'DevOps', x: 92, y: 45, delay: '2.5s' }
  ];

  onOrbitMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.orbitTransform = `perspective(1200px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  }

  onOrbitLeave(): void {
    this.orbitTransform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  }
}
