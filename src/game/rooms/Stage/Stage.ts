import { Area } from '../../Area';
import { Room } from '../../Room';
import { Player } from '../../objects/Player';
import { StageDirector } from './StageDirector';

export class Stage extends Room {
	director: StageDirector;
	area: Area;
	ctx: CanvasRenderingContext2D;
	player: Player;

	constructor(ctx: CanvasRenderingContext2D) {
		super();
		this.area = new Area(ctx, this);
		this.director = new StageDirector();
		this.ctx = ctx;

		this.player = new Player(this.area, 0, 0);

		// input binds
		input?.bind?.('w');
		input?.bind?.('a');
		input?.bind?.('s');
		input?.bind?.('d');
		input?.bind?.('ArrowUp');
		input?.bind?.('ArrowLeft');
		input?.bind?.('ArrowRight');
		input?.bind?.('ArrowDown');
	}

	update(dt: number) {
		super.update(dt);
		this.director.update(dt);
		this.area.update(dt);
		this.player.update(dt);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.area.draw();
		this.player.draw();
	}
}
