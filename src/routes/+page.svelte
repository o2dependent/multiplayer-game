<script lang="ts">
	import { onMount } from 'svelte';
	import { Game } from '../game/Game';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const game = new Game(canvas);
		game.start();
	});
</script>

<canvas width={1000} height={800} bind:this={canvas} />

<style lang="postcss">
	canvas {
		@apply border border-red-500 mx-auto;
	}
</style>
