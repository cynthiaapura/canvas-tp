import "destyle.css";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const backgroundImage = new Image();
backgroundImage.src = "/assets/background.svg";

const characterImage = new Image();
characterImage.src = "/assets/character.png";

let imgWidth = 0;
let imgHeight = 0;
let isBackgroundLoaded = false;
let isCharacterLoaded = false;

backgroundImage.onload = () => {
  imgWidth = backgroundImage.width;
  imgHeight = backgroundImage.height;
  isBackgroundLoaded = true;

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(animate);
};

characterImage.onload = () => {
  isCharacterLoaded = true;
};

function resizeCanvas() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const imgRatio = imgWidth / imgHeight;
  const winRatio = winW / winH;

  if (winRatio > imgRatio) {
    canvas.height = winH;
    canvas.width = winH * imgRatio;
  } else {
    canvas.width = winW;
    canvas.height = winW / imgRatio;
  }
}

function drawGlitchTitle(timestamp: number) {
  const text = "FABRIK";
  const centerX = canvas.width / 2;
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
    ctx.fillStyle = "rgba(124, 83, 11, 0.46)";
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isBackgroundLoaded) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }

  drawGlitchTitle(timestamp);

  if (isCharacterLoaded) {
    const charWidth = canvas.width * 0.33;
    const charHeight = (characterImage.height / characterImage.width) * charWidth;
    const x = (canvas.width - charWidth) / 2;
    const y = canvas.height - charHeight - 10;
    ctx.drawImage(characterImage, x, y, charWidth, charHeight);
  }

  requestAnimationFrame(animate);
}
