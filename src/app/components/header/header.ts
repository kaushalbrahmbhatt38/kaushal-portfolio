import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { ScrollService } from '../../service/scroll/scroll-service';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;

  heroVisible = false;
  frameTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  private particles: Particle[] = [];
  private animationId = 0;
  private resizeObserver?: ResizeObserver;
  private scrollService: ScrollService

  constructor() {
    this.scrollService = inject(ScrollService);
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.heroVisible = true), 100);
    this.initParticles();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
  }

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }

  onFrameMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.frameTransform = `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  onFrameMouseLeave(): void {
    this.frameTransform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
  }

  private initParticles(): void {
    const canvas = this.particleCanvas?.nativeElement;
    if (!canvas) return;

    this.resizeCanvas();
    this.particles = Array.from({ length: 80 }, () => this.createParticle(canvas));

    const animate = () => {
      this.drawParticles(canvas);
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private resizeCanvas(): void {
    const canvas = this.particleCanvas?.nativeElement;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  private createParticle(canvas: HTMLCanvasElement): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  private drawParticles(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
  }
}
