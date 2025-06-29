import "destyle.css";
import "./style.css";

class SmokeParticle {
  x: number = 0;
  y: number = 0;
  radius: number = 0;
  opacity: number = 0;
  vx: number = 0;
  vy: number = 0;
  fade: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * displayWidth;
    this.y = displayHeight - Math.random() * displayHeight;
    this.radius = 30 + Math.random() * 40;
    this.opacity = 0.1;
    this.vx = -0.1 + Math.random() * 0.2;
    this.vy = -0.3 - Math.random() * 0.15;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius < 0) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `rgba(200, 240, 255, ${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(150, 200, 255, ${this.opacity * 0.6})`);
    gradient.addColorStop(1, `rgba(150, 200, 255, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const noiseCanvas = document.createElement("canvas");
const noiseCtx = noiseCanvas.getContext("2d")!;

function generateNoise() {
  const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
  const buffer = imageData.data;
  for (let i = 0; i < buffer.length; i += 4) {
    const val = Math.random() * 255;
    buffer[i] = val;
    buffer[i + 1] = val;
    buffer[i + 2] = val;
    buffer[i + 3] = 15 + Math.random() * 10;
  }
  noiseCtx.putImageData(imageData, 0, 0);
}

const backgroundImage = new Image();
backgroundImage.src = "/assets/background.svg";

const silhouetteImage = new Image();
silhouetteImage.src = "/assets/child.png";

const characterImage = new Image();
characterImage.src = "/assets/character.png";

const factoryImage = new Image();
factoryImage.src = "/assets/factory.png";

let imgWidth = 0;
let imgHeight = 0;

let displayWidth = 0;
let displayHeight = 0;

let isBackgroundLoaded = false;
let isSilhouetteLoaded = false;
let isCharacterLoaded = false;
let isFactoryLoaded = false;

const smokeParticles: SmokeParticle[] = [];
const SMOKE_COUNT = 100;

backgroundImage.onload = () => {
  imgWidth = backgroundImage.width;
  imgHeight = backgroundImage.height;
  isBackgroundLoaded = true;
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(animate);
};

silhouetteImage.onload = () => {
  isSilhouetteLoaded = true;
};

characterImage.onload = () => {
  isCharacterLoaded = true;
};

factoryImage.onload = () => {
  isFactoryLoaded = true;
};

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const imgRatio = imgWidth / imgHeight;
  const winRatio = winW / winH;

  if (winRatio > imgRatio) {
    displayHeight = winH;
    displayWidth = winH * imgRatio;
  } else {
    displayWidth = winW;
    displayHeight = winW / imgRatio;
  }

  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;

  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  noiseCanvas.width = displayWidth;
  noiseCanvas.height = displayHeight;
}

function drawGlitchTitle(timestamp: number) {
  const text = "FABRIK";
  const centerX = displayWidth / 2;
  const y = 60;

  ctx.save();
  ctx.font = "bold 100px 'Lacquer', cursive";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const baseAlpha = 0.9 + 0.05 * Math.sin(timestamp * 0.002);
  ctx.shadowColor = `rgba(0, 180, 255, ${baseAlpha * 0.7})`;
  ctx.shadowBlur = 15;
  ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha})`;
  ctx.fillText(text, centerX, y);
  if (Math.random() < 0.05) {
    ctx.font = "normal 100px 'Lacquer', cursive";
    ctx.fillStyle = "rgba(255, 149, 0, 0.23)";
    const offsetX = -2 + Math.random() * 3;
    const offsetY = -1 + Math.random() * 2;
    ctx.fillText(text, centerX + offsetX, y + offsetY);
  }

  if (Math.random() < 0.05) {
    ctx.font = "italic 100px 'Lacquer', cursive";
    ctx.fillStyle = "rgba(0, 255, 255, 0.28)";
    const offsetX = 1 + Math.random() * 2;
    const offsetY = -1 + Math.random() * 2;
    ctx.fillText(text, centerX + offsetX, y + offsetY);
  }

  if (Math.random() < 0.01) {
    ctx.font = "bold 100px 'Lacquer', cursive";
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    const offsetX = -0.5 + Math.random();
    const offsetY = -0.5 + Math.random();
    ctx.fillText(text, centerX + offsetX, y + offsetY);
  }

  ctx.restore();
}

function animate(timestamp = 0) {
  ctx.clearRect(0, 0, displayWidth, displayHeight);

  if (isBackgroundLoaded) {
    ctx.drawImage(backgroundImage, 0, 0, displayWidth, displayHeight);
  }

  if (isSilhouetteLoaded && isFactoryLoaded) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = displayWidth;
    tempCanvas.height = displayHeight;
    const tempCtx = tempCanvas.getContext("2d")!;

    const silhouetteWidth = displayWidth * 0.75;
    const silhouetteHeight = (silhouetteImage.height / silhouetteImage.width) * silhouetteWidth;
    const silhouetteX = (displayWidth - silhouetteWidth) / 2;
    const silhouetteY = displayHeight - silhouetteHeight + 280;

    tempCtx.drawImage(factoryImage, 0, 0, displayWidth, displayHeight);

    for (const p of smokeParticles) {
      p.update();
      p.draw(tempCtx);
    }

    tempCtx.globalCompositeOperation = "destination-in";
    tempCtx.drawImage(silhouetteImage, silhouetteX, silhouetteY, silhouetteWidth, silhouetteHeight);

    ctx.drawImage(tempCanvas, 0, 0);
 
  }

  drawGlitchTitle(timestamp);

if (isCharacterLoaded) {
  const charWidth = displayWidth * 0.33;
  const charHeight = (characterImage.height / characterImage.width) * charWidth;
  const x = (displayWidth - charWidth) / 2;
  const y = displayHeight - charHeight - 10;

  const scale = 1 + 0.02 * Math.sin(performance.now() * 0.001);

  ctx.save();

  const cx = x + charWidth / 2;
  const cy = y + charHeight / 2;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-cx, -cy);

  ctx.drawImage(characterImage, x, y, charWidth, charHeight);

  ctx.restore();
}


  generateNoise();
  ctx.drawImage(noiseCanvas, 0, 0, displayWidth, displayHeight);

  requestAnimationFrame(animate);
}

for (let i = 0; i < SMOKE_COUNT; i++) {
  smokeParticles.push(new SmokeParticle());
}
