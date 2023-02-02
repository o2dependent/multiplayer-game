// Class to track input state for the game
// it should be able to track all keys and mouse buttons dynamically
// and also be able to track mouse position
// it will allow any object to check if a button is down through input.isDown('key')
// and also allow for checking if a button was pressed or released in the current frame
// through input.isPressed('key') and input.isReleased('key')
// keys will be tracked by their id and key given with the input.bind method
export class Input {
	private _keys = new Map<string, { isDown: boolean; isPressed: boolean; isReleased: boolean }>();
	private _mouseButtons = new Map<
		string,
		{ isDown: boolean; isPressed: boolean; isReleased: boolean }
	>();
	private _mouseX = 0;
	private _mouseY = 0;

	constructor(element: HTMLElement) {
		window.addEventListener('keydown', (e) => {
			console.log(e.key, this._keys);
			if (this._keys.has(e.key)) {
				const key = this._keys.get(e.key);
				if (!key) return;
				key.isDown = true;
				key.isPressed = true;
				key.isReleased = false;

				this._keys.set(e.key, key);
			}
		});

		window.addEventListener('keyup', (e) => {
			if (this._keys.has(e.key)) {
				const key = this._keys.get(e.key);
				if (!key) return;
				key.isDown = false;
				key.isPressed = false;
				key.isReleased = true;

				this._keys.set(e.key, key);
			}
		});

		element.addEventListener('mousedown', (e) => {
			if (this._mouseButtons.has(e.button.toString())) {
				const button = this._mouseButtons.get(e.button.toString());
				if (!button) return;
				button.isDown = true;
				button.isPressed = true;
				button.isReleased = false;

				this._mouseButtons.set(e.button.toString(), button);
			}
		});

		element.addEventListener('mouseup', (e) => {
			if (this._mouseButtons.has(e.button.toString())) {
				const button = this._mouseButtons.get(e.button.toString());
				if (!button) return;
				button.isDown = false;
				button.isPressed = false;
				button.isReleased = true;

				this._mouseButtons.set(e.button.toString(), button);
			}
		});

		element.addEventListener('mousemove', (e) => {
			this._mouseX = e.clientX;
			this._mouseY = e.clientY;
		});
	}

	update() {
		for (const [, key] of this._keys) {
			key.isPressed = false;
			key.isReleased = false;
		}

		for (const [, button] of this._mouseButtons) {
			button.isPressed = false;
			button.isReleased = false;
		}
	}

	bind(key: string) {
		this._keys.set(key, { isDown: false, isPressed: false, isReleased: false });
	}

	isDown(key: string) {
		const k = this._keys.get(key);
		if (!k) return false;
		return k.isDown;
	}

	isPressed(key: string) {
		const k = this._keys.get(key);
		if (!k) return false;
		return k.isPressed;
	}

	isReleased(key: string) {
		const k = this._keys.get(key);
		if (!k) return false;
		return k.isReleased;
	}

	bindMouse(button: string) {
		this._mouseButtons.set(button, { isDown: false, isPressed: false, isReleased: false });
	}

	isMouseDown(button: string) {
		const b = this._mouseButtons.get(button);
		if (!b) return false;
		return b.isDown;
	}

	isMousePressed(button: string) {
		const b = this._mouseButtons.get(button);
		if (!b) return false;
		return b.isPressed;
	}

	isMouseReleased(button: string) {
		const b = this._mouseButtons.get(button);
		if (!b) return false;
		return b.isReleased;
	}

	get mousePosition() {
		return { x: this._mouseX, y: this._mouseY };
	}
}
