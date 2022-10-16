<script lang="ts">
    import { fade } from 'svelte/transition';
    
    export let contextMenuPosition: number[];
</script>

<main transition:fade={{duration: 100}} style="top: {contextMenuPosition[1]}px; left: {contextMenuPosition[0]}px; margin-top: 24px;" on:contextmenu|preventDefault={() => {}}>
    <slot></slot>
</main>

<style>
    main {
        position: absolute;
        
        width: 225px;
        height: fit-content;
        box-shadow: 0px 4px 12px -4px rgba(44, 44, 44, 0.12), 0px 16px 32px rgba(48, 48, 48, 0.16);

        border-radius: 4px;

        padding: 4px;

        background: #1D1C1D;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
    }
</style>