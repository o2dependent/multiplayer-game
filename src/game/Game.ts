import { Input } from './Input';
import { Stage } from './rooms/Stage/Stage';

export class Game {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	room: Stage;
	time: number | null = null;

	constructor(canvas: HTMLCanvasElement) {
		input = new Input(canvas);
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.room = new Stage(this.ctx);
	}

	start() {
		this.time = 0;
		this.gameLoop();
	}

	gameLoop() {
		if (!this.time) this.time = Date.now();
		const newTime = Date.now();
		const dt = (newTime - (this?.time ?? 0)) / 1000;
		this.time = newTime;

		this.update(dt);
		this.draw();

		requestAnimationFrame(() => this.gameLoop());
	}

	update(dt: number) {
		input?.update?.();
		this.room?.update?.(dt);
	}

	draw() {
		this.room?.draw?.();
	}
}
