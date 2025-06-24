import "destyle.css";
import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const backgroundImage = new Image();
backgroundImage.src = "/assets/background.svg";

const characterImage = new Image();
characterImage.src = "/assets/character2.png";

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
  animate();
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isBackgroundLoaded) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }

  if (isCharacterLoaded) {
    const charWidth = canvas.width * 0.33; 
    const charHeight = (characterImage.height / characterImage.width) * charWidth;

    const x = (canvas.width - charWidth) / 2;
    const y = canvas.height - charHeight - 10;

    ctx.drawImage(characterImage, x, y, charWidth, charHeight);
  }

  requestAnimationFrame(animate);
}
