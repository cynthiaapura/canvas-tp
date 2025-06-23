export class Player {
  private img: HTMLImageElement;
  private loaded: boolean = false;

  constructor(path: string = "./public/child.png") {
    this.img = new Image();
    this.img.src = path;
    this.img.onload = () => {
      this.loaded = true;
    };
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number = 100,
    height: number = 160
  ) {
    if (this.loaded) {
      ctx.drawImage(this.img, x - width / 2, y - height, width, height);
    }
  }
}
