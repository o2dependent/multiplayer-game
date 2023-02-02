import type { Area } from '../Area';
import { GameObject } from '../GameObject';

export class Player extends GameObject {
	v = 10;
	maxV = 250;
	r = 0;
	ra = 2 * Math.PI;
	a = 150;

	bodyLength = 10;
	body: { x: number; y: number; w: number; h: number; r: number }[] = [];

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

		if (input?.isDown('ArrowRight') || input?.isDown('a'))
			this.r = (this.r + this.ra * dt) % (2 * Math.PI);
		if (input?.isDown('ArrowLeft') || input?.isDown('d'))
			this.r = (this.r - this.ra * dt) % (2 * Math.PI);

		if (input?.isDown('ArrowUp') || input?.isDown('w')) this.v = this.v + this.a * dt;
		else this.v = this.v - this.a * dt;
		if (input?.isDown('ArrowDown') || input?.isDown('s')) this.v = this.v - this.a * dt;

		this.v = Math.max(0, this.v);
		this.v = Math.min(this.maxV, this.v);
		console.log(this.v);

		this.x = this.x + this.v * Math.cos(this.r) * dt;
		this.y = this.y + this.v * Math.sin(this.r) * dt;
	}

	draw() {
		// draw rectangle and rotate it based on this.r
		this.area.ctx.fillStyle = isBetween(this.r, 0, 0.05) ? 'red' : 'blue';
		this.area.ctx.translate(this.x, this.y);
		this.area.ctx.setLineDash([5, 5]);
		// rotate to the center of the rectangle
		this.area.ctx.rotate(this.r);
		this.area.ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		// left companion area
		this.area.ctx.fillStyle = 'green';
		this.area.ctx.strokeRect(-this.w / 2, -this.h / 2 - 5 - this.w, this.w, this.w);
		// right companion area
		this.area.ctx.strokeStyle = 'green';
		this.area.ctx.strokeRect(-this.w / 2, this.h / 2 + 5, this.w, this.w);

		this.area.ctx.rotate(-this.r);
		this.area.ctx.translate(-this.x, -this.y);
	}
}
export const isBetween = (x: number, a: number, b: number) => {
	return x >= a && x <= b;
};
