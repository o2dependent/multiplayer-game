import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import watchAndRun from 'vite-plugin-watch-and-run';

import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		watchAndRun([
			{
				name: 'gen-game-objects',
				watchKind: ['add', 'change', 'unlink'],
				watch: path.resolve('src/game/objects/**/*.ts'),
				run: 'npm run gen-game-objects',
				delay: 300
			}
		]),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
