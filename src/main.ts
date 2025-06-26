import "destyle.css";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const backgroundImage = new Image();
backgroundImage.src = "/assets/background.svg";

const silhouetteImage = new Image();
silhouetteImage.src = "/assets/child.png";

const characterImage = new Image();
characterImage.src = "/assets/character.png";

let imgWidth = 0;
let imgHeight = 0;

let displayWidth = 0;
let displayHeight = 0;

let isBackgroundLoaded = false;
let isSilhouetteLoaded = false;
let isCharacterLoaded = false;

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
}

function drawGlitchTitle(timestamp: number) {
  const text = "FABRIK";
  const centerX = displayWidth / 2;
  const y = 60;

  ctx.save();

  ctx.font = "bold 100px 'Share Tech Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const baseAlpha = 0.75 + 0.05 * Math.sin(timestamp * 0.002);
  ctx.shadowColor = `rgba(80, 120, 140, ${baseAlpha})`;
  ctx.shadowBlur = 10;
  ctx.fillStyle = `rgba(200, 220, 230, ${baseAlpha})`;
  ctx.fillText(text, centerX, y);

  if (Math.random() < 0.05) {
    ctx.fillStyle = "rgba(165, 107, 5, 0.46)";
    const offsetX = -2 + Math.random() * 1.5;
    const offsetY = -1 + Math.random() * 1.5;
    ctx.fillText(text, centerX + offsetX, y + offsetY);
  }

  if (Math.random() < 0.05) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    const offsetX = 1.5 + Math.random() * 1.5;
    const offsetY = -1 + Math.random() * 1.5;
    ctx.fillText(text, centerX + offsetX, y + offsetY);
  }

  ctx.restore();
}

function animate(timestamp = 0) {
  ctx.clearRect(0, 0, displayWidth, displayHeight);

  // fond
  if (isBackgroundLoaded) {
    ctx.drawImage(backgroundImage, 0, 0, displayWidth, displayHeight);
  }

  // silhouette de l'enfant
  if (isSilhouetteLoaded) {
    const silhouetteWidth = displayWidth * 0.75;
    const silhouetteHeight = (silhouetteImage.height / silhouetteImage.width) * silhouetteWidth;
    const silhouetteX = (displayWidth - silhouetteWidth) / 2;
    const silhouetteY = displayHeight - silhouetteHeight + 280;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, displayWidth, displayHeight);
    ctx.clip();
    ctx.drawImage(silhouetteImage, silhouetteX, silhouetteY, silhouetteWidth, silhouetteHeight);
    ctx.restore();
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fillRect(0, 0, displayWidth, displayHeight);


  drawGlitchTitle(timestamp);

  // perso
  if (isCharacterLoaded) {
    const charWidth = displayWidth * 0.33;
    const charHeight = (characterImage.height / characterImage.width) * charWidth;
    const x = (displayWidth - charWidth) / 2;
    const y = displayHeight - charHeight - 10;
    ctx.drawImage(characterImage, x, y, charWidth, charHeight);
  }

  requestAnimationFrame(animate);
}
