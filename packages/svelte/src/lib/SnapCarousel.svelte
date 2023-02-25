<script lang="ts">
  import {
    dragToScroll as _dragToScroll,
  } from '@snap-carousel/core';
  import { carousel } from '.'

	export let tag = 'div';
	export let onIndexChange: () => void;
</script>

<svelte:element this={tag} class='snap-carousel-container' use:carousel={{ onIndexChange }}>
  <slot />
</svelte:element>

<style>
  .scrolling {
    scroll-snap-type: none !important;
  }

  .scrolling * {
    user-select: none !important;
    pointer-events: none;
  }

  .snap-carousel-container {
    display: flex;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-y: hidden;
    overflow-x: auto;
    flex-direction: row;
    max-width: 100%;
  }

  .snap-carousel-container::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .snap-carousel-container > * {
    scroll-snap-align: center;
  }
</style>
