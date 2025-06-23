import { Player } from "./player";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Exemple de positionnement centré
  player.draw(ctx, canvas.width / 2, canvas.height * 0.7);

  requestAnimationFrame(draw);
}

draw();

