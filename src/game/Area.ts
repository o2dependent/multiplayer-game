import type { ConstructorParameters } from '../types/ConstructorParameters';
import type { GameObject } from './GameObject';
import type { Room } from './Room';

// get the 4th parameter from the constructor
type Options<G extends typeof GameObject> = ConstructorParameters<G>[3];

export class Area {
	ctx: CanvasRenderingContext2D;
	room: Room;
	gameObjects: GameObject[] = [];

	constructor(ctx: CanvasRenderingContext2D, room: Room) {
		this.ctx = ctx;
		this.room = room;
	}

	update(dt: number) {
		for (const gameObject of this.gameObjects) {
			gameObject.update(dt);
		}
	}

	draw() {
		for (const gameObject of this.gameObjects) {
			gameObject.draw();
		}
	}

	addGameObject<G extends typeof GameObject>(
		NewGameObject: G,
		x: number,
		y: number,
		options?: Options<G>
	) {
		const gameObject = new NewGameObject(this, x, y, options);
		this.gameObjects.push(gameObject);
		return gameObject;
	}
}
