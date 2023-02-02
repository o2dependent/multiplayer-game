import { Timer } from './Timer';

export class Room {
	timer: Timer;

	constructor() {
		this.timer = new Timer();
	}

	update(dt: number) {
		if (this?.timer) this.timer.update(dt);
	}
}
