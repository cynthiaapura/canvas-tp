export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  scale: number = 0.4;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = "/assets/child.png";
  }

  draw() {
    if (!this.image.complete) return;

    const width = this.image.width * this.scale;
    const height = this.image.height * this.scale;

    const x = this.canvas.width / 2 - width / 2;
    const y = this.canvas.height / 2 - height / 2 + 40; // centré un peu vers le bas

    this.ctx.drawImage(this.image, x, y, width, height);
  }
}
