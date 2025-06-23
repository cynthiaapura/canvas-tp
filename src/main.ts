import "destyle.css";
import "./style.css";
import { Player } from "./player";

const canvas = document.createElement("canvas");
canvas.id = "fabrik-canvas";
document.body.appendChild(canvas);

canvas.width = 360;
canvas.height = 640;

const ctx = canvas.getContext("2d")!;
const player = new Player(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // fond
  ctx.fillStyle = "#0f1114";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // personnage
  player.draw();

  requestAnimationFrame(animate);
}

animate();
