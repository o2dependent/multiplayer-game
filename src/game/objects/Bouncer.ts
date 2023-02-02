import type { Area } from '../Area';
import { GameObject } from '../GameObject';

export class Bouncer extends GameObject {
	v = 10;
	r = -Math.PI;
	ra = 2 * Math.PI;
	a = 10;

	constructor(
		area: Area,
		x: number,
		y: number,
		options?: { w?: number; h?: number; depth?: number }
	) {
		super(area, x, y, options);

		this.x = this.area.ctx.canvas.width / 2;
		this.y = this.area.ctx.canvas.height / 2;

		this.w = options?.w ?? 50;
		this.h = options?.h ?? 50;
	}

	update(dt: number) {
		super.update(dt);

		if (input?.isDown('ArrowRight')) this.r = (this.r + this.ra * dt) % (2 * Math.PI);

		// this.x = this.x + this.v * Math.cos(this.r) * dt;
		// this.y = this.y + this.v * Math.sin(this.r) * dt;
	}

	isBetween(x: number, a: number, b: number) {
		return x >= a && x <= b;
	}

	draw() {
		// draw rectangle and rotate it based on this.r
		this.area.ctx.fillStyle = this.isBetween(this.r, 0, 0.05) ? 'red' : 'blue';
		this.area.ctx.translate(this.x, this.y);
		this.area.ctx.rotate(this.r);
		this.area.ctx.fillRect(0, 0, this.w, this.h);
		this.area.ctx.rotate(-this.r);
		this.area.ctx.translate(-this.x, -this.y);
	}
}
