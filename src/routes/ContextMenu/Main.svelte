<script lang="ts">
    import { clickOutside } from 'svelte-use-click-outside';
    import { fade } from 'svelte/transition';
    
    export let showContextMenu: boolean;
    export let contextMenuPosition: number[];
</script>

<main transition:fade={{duration: 100}} style="top: {contextMenuPosition[1]}px; left: {contextMenuPosition[0]}px;" use:clickOutside={() => showContextMenu = false} on:contextmenu|preventDefault={() => {}}>
    <slot></slot>
</main>

<style>
    main {
        position: absolute;
        
        width: 225px;
        height: fit-content;

        border-radius: 4px;

        padding: 4px;

        background: #1D1C1D;

        display: flex;
        flex-direction: column;
        gap: 2px;
    }
</style>