// See https://kit.svelte.dev/docs/types#app

import type { Input } from './game/Input';

// for information about these interfaces
declare global {
	interface Window {
		// add input to the window object
		input: Input;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	declare let input: Input | null;
}

export {};
