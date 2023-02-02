import type { Area } from './Area';
import { Timer } from './Timer';

export class GameObject {
	id: string;
	area: Area;
	x: number;
	y: number;
	w: number;
	h: number;
	createdAt: number;
	depth = 50;
	isDead = false;
	timer: Timer;

	constructor(
		area: Area,
		x: number,
		y: number,
		options?: {
			w?: number;
			h?: number;
			depth?: number;
		}
	) {
		this.area = area;
		this.x = x;
		this.y = y;
		this.w = options?.w ?? 0;
		this.h = options?.h ?? 0;
		this.depth = options?.depth ?? 50;

		this.createdAt = Date.now();
		this.id = crypto.randomUUID();

		this.timer = new Timer();
	}

	update(dt: number) {
		if (this?.timer) this.timer.update(dt);
	}

	draw() {
		return;
	}

	destroy() {
		this.isDead = true;
	}
}
