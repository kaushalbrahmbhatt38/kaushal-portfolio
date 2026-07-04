import { AfterViewInit, Component, ElementRef, inject, ViewChild, NgZone, OnDestroy, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ScrollService } from '../../service/scroll/scroll-service';

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; opacity: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') particleCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('profileFrame') profileFrame!: ElementRef<HTMLElement>;

  heroVisible = false;
  private particles: Particle[] = [];
  private animationId = 0;
  private scrollService: ScrollService;
  private ngZone = inject(NgZone);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);
  private destroyListeners: (() => void)[] = [];

  // Cached dimension to completely eliminate layout thrashing during mouse movements
  private frameRect: DOMRect | null = null;

  constructor() {
    this.scrollService = inject(ScrollService);
  }

  ngAfterViewInit(): void {
    this.heroVisible = true; 
    this.cdr.detectChanges(); // Explicitly force the fade-in animation to render safely under OnPush

    this.ngZone.runOutsideAngular(() => {
      this.initParticles();
      this.setupInteractiveListeners();
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.destroyListeners.forEach(cleanup => cleanup());
  }

  scrollTo(elementId: string): void {
    this.scrollService.scrollToElement(elementId);
  }

  private setupInteractiveListeners(): void {
    const frame = this.profileFrame?.nativeElement;
    if (!frame) return;

    // Cache the frame position initially
    this.frameRect = frame.getBoundingClientRect();

    const mouseMoveSub = this.renderer.listen(frame, 'mousemove', (event: MouseEvent) => {
      if (!this.frameRect) return;

      // Use the cached layout metrics instead of triggering a DOM layout query!
      const x = (event.clientX - this.frameRect.left) / this.frameRect.width - 0.5;
      const y = (event.clientY - this.frameRect.top) / this.frameRect.height - 0.5;
      
      const innerFrame = frame.querySelector('.frame-inner') as HTMLElement;
      if (innerFrame) {
        innerFrame.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    const mouseLeaveSub = this.renderer.listen(frame, 'mouseleave', () => {
      const innerFrame = frame.querySelector('.frame-inner') as HTMLElement;
      if (innerFrame) {
        innerFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    });

    // Handle resizing smoothly and refresh the cached layout frame metrics
    let resizeTimeout: any;
    const resizeSub = this.renderer.listen(window, 'resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resizeCanvas();
        if (frame) {
          this.frameRect = frame.getBoundingClientRect();
        }
      }, 150);
    });

    this.destroyListeners.push(mouseMoveSub, mouseLeaveSub, resizeSub);
  }

  private initParticles(): void {
    const canvas = this.particleCanvas?.nativeElement;
    if (!canvas) return;

    this.resizeCanvas();
    
    // Lowered slightly to 60 for absolute buttery smooth rendering on high-DPI retina panels
    this.particles = Array.from({ length: 60 }, () => this.createParticle(canvas));

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

    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    // Hard cap dimensions to layout pixels to avoid performance penalties on High-DPI screens
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  private createParticle(canvas: HTMLCanvasElement): Particle {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.2
    };
  }

  private drawParticles(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const len = this.particles.length;
    const maxDistanceSq = 14400; // Capped to 100px squared for shorter, high-performance lines

    for (let i = 0; i < len; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistanceSq) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }
}