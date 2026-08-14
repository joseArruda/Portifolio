import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Theme } from '../../../core/services/theme';

interface Particle {

  x: number;
  y: number;

  vx: number;
  vy: number;

  radius: number;

}

interface Blob {

  x: number;
  y: number;

  radius: number;

  color: string;

  angle: number;

  speed: number;

  orbitX: number;

  orbitY: number;

}

interface MousePosition {
  x: number;
  y: number;
}

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.html',
  styleUrl: './background.scss'
})



export class Background implements AfterViewInit {

  constructor(
    private themeService: Theme
  ){}
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  private noiseCanvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];

  private blobs: Blob[] = [];

  private gridOffset = 0;

  private mouse: MousePosition = {
  x: -1000,
  y: -1000
};


private css(name: string): string {

  return getComputedStyle(document.body)
    .getPropertyValue(name)
    .trim();

}

private createNoise() {

  this.noiseCanvas = document.createElement('canvas');

  this.noiseCanvas.width = 256;
  this.noiseCanvas.height = 256;

  const ctx = this.noiseCanvas.getContext('2d')!;

  const image = ctx.createImageData(256, 256);

  const data = image.data;

  for (let i = 0; i < data.length; i += 4) {

    const value = Math.random() * 255;

    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 18;

  }

  ctx.putImageData(image, 0, 0);

}

private drawNoise() {

  this.ctx.save();

  this.ctx.globalAlpha = .015;

  this.ctx.drawImage(

    this.noiseCanvas,

    0,
    0,

    this.canvas.nativeElement.width,

    this.canvas.nativeElement.height

  );

  this.ctx.restore();

}

  private createParticles() {

  this.particles = [];

  const amount = 35;

  const canvas = this.canvas.nativeElement;
  

  for (let i = 0; i < amount; i++) {
    

    this.particles.push({

      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      vx:
(Math.random()-.5)*.45,

vy:
(Math.random()-.5)*.45,

      radius:
      Math.random() * 3 + 0.5

    });

  }

}

  ngAfterViewInit() {

    this.themeService.theme$
.subscribe(() => {

  this.createBlobs();
  this.createParticles();

});

    this.createNoise();

    const canvas = this.canvas.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.resize();

    this.createParticles();

    window.addEventListener('resize', () => this.resize());

    this.animate();

    window.addEventListener("mousemove", (event) => {

  this.mouse.x = event.clientX;
  this.mouse.y = event.clientY;

});

  }

  resize() {

    this.canvas.nativeElement.width = window.innerWidth;

    this.canvas.nativeElement.height = window.innerHeight;

    const canvas = this.canvas.nativeElement;

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  this.createParticles();

this.createBlobs();
  }

  animate() {

    this.draw();

    requestAnimationFrame(() => this.animate());

  }

  private drawBlobs() {

    this.ctx.save();

this.ctx.filter = "blur(90px)";

  for (const blob of this.blobs) {

    blob.angle += blob.speed;

const offsetX =
Math.cos(blob.angle) * blob.orbitX +
Math.sin(blob.angle * 0.7) * 40;

const offsetY =
Math.sin(blob.angle) * blob.orbitY +
Math.cos(blob.angle * 0.5) * 30;

    const gradient = this.ctx.createRadialGradient(

      blob.x + offsetX,
      blob.y + offsetY,

      0,

      blob.x + offsetX,
      blob.y + offsetY,

      blob.radius

    );

    gradient.addColorStop(0, blob.color);

    gradient.addColorStop(1, "transparent");

    this.ctx.fillStyle = gradient;

    this.ctx.beginPath();

    this.ctx.arc(

      blob.x + offsetX,

      blob.y + offsetY,

      blob.radius,

      0,

      Math.PI * 2

    );

    this.ctx.fill();

    this.ctx.restore();

    this.ctx.globalCompositeOperation = "screen";

    this.ctx.globalCompositeOperation = "source-over";

  }

}

  draw() {

  this.gridOffset += 2.5;

  const canvas = this.canvas.nativeElement;

  // Limpa o canvas
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ==========================
  // Fundo (Gradient)
  // ==========================

  const gradient = this.ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );

  gradient.addColorStop(0, this.css("--background-primary"));
  gradient.addColorStop(1, this.css("--background-secondary"));

  this.ctx.fillStyle = gradient;
  this.ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ==========================
  // Blobs
  // ==========================

  this.drawBlobs();

  // ==========================
  // Noise
  // ==========================

  this.drawNoise();

  // ==========================
  // Grid
  // ==========================

  const alpha = 0.02 + Math.random() * 0.015;

  this.ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  this.ctx.lineWidth = 1;

  this.ctx.shadowBlur = 2;
  this.ctx.shadowColor = this.css("shadow-color");

  const size = 50;

  for (let x = -size; x < canvas.width + size; x += size) {

    this.ctx.beginPath();

    this.ctx.moveTo(
      x + this.gridOffset % size,
      0
    );

    this.ctx.lineTo(
      x + this.gridOffset % size,
      canvas.height
    );

    this.ctx.stroke();

  }

  for (let y = 0; y < canvas.height; y += size) {

    this.ctx.beginPath();

    this.ctx.moveTo(0, y);

    this.ctx.lineTo(canvas.width, y);

    this.ctx.stroke();

  }

  // ==========================
  // Partículas
  // ==========================

  for (const particle of this.particles) {

    const dx = particle.x - this.mouse.x;
    const dy = particle.y - this.mouse.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {

      const force = (150 - distance) / 150;

      particle.x += dx * force * 0.03;
      particle.y += dy * force * 0.03;

    }

    particle.x += particle.vx * 3.3;
    particle.y += particle.vy * 3.3;

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.vx *= -1;
    }

    if (particle.y < 0 || particle.y > canvas.height) {
      particle.vy *= -1;
    }

    this.ctx.beginPath();

    this.ctx.arc(
      particle.x,
      particle.y,
      particle.radius,
      0,
      Math.PI * 2
    );

    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = "#0f71e9";

    this.ctx.fillStyle = this.css("--particle-color");

    this.ctx.fill();

  }

  // ==========================
  // Conexões
  // ==========================

  this.ctx.shadowBlur = 0;

  this.drawConnections();

}

private drawConnections() {

  const maxDistance = 200;

  for (let i = 0; i < this.particles.length; i++) {

    const p1 = this.particles[i];

    for (let j = i + 1; j < this.particles.length; j++) {

      const p2 = this.particles[j];

      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {

        const mouseDistance = Math.sqrt(

  Math.pow((p1.x + p2.x) / 2 - this.mouse.x, 2) +
  Math.pow((p1.y + p2.y) / 2 - this.mouse.y, 2)

);

let opacity = 1 - distance / maxDistance;

if (mouseDistance < 220) {

  opacity *= 2;

}

  const color = this.css("--line-color");

this.ctx.strokeStyle =
color.replace(")", `, ${opacity})`);

        this.ctx.beginPath();

        this.ctx.lineWidth = 0.2;

        this.ctx.moveTo(p1.x, p1.y);

        this.ctx.lineTo(p2.x, p2.y);

        this.ctx.stroke();

      }

    }

  }

}

private createBlobs() {

  const canvas = this.canvas.nativeElement;

  this.blobs = [

    {
      x: canvas.width * .2,
      y: canvas.height * .3,
      radius: 280,
      color: this.css("--blob-1"), // mesma cor
      angle: 0,
      speed: .001,
      orbitX: 120,
      orbitY: 80
    },

    {
      x: canvas.width * .8,
      y: canvas.height * .25,
      radius: 240,
      color: this.css("--blob-2"), // mesma cor
      angle: 2,
      speed: .0008,
      orbitX: 90,
      orbitY: 150
    },

    {
      x: canvas.width * .55,
      y: canvas.height * .8,
      radius: 320,
      color:  this.css("--blob-3"), // mesma cor
      angle: 1,
      speed: .0006,
      orbitX: 170,
      orbitY: 110
    }

  ];

}
}
