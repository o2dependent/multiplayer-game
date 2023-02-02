export class Timer {
	private _time: number;
	private _events = new Map<string, { time: number; callback: () => void; times?: number }>();

	constructor() {
		// time in seconds
		this._time = new Date().getTime() / 1000;
	}

	update(dt: number) {
		this._time += dt;

		for (const [id, event] of this._events) {
			if (this._time >= event.time) {
				event.callback();
				if (event.times) {
					event.times -= 1;
					if (event.times <= 0) {
						this._events.delete(id);
					} else {
						event.time += dt;
					}
				} else {
					this._events.delete(id);
				}
			}
		}
	}

	destroy() {
		// destroy all events
		this._events.clear();
	}

	after(seconds: number, callback: () => void, id: string = crypto.randomUUID()) {
		this._events.set(id, { time: this._time + seconds, callback });
	}

	every(seconds: number, callback: () => void, id: string = crypto.randomUUID(), times?: number) {
		this._events.set(id, { time: this._time + seconds, callback, times });
	}
}
