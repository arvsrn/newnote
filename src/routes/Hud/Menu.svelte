<script lang="ts">
    // to hardcode the position because I lack brain power
    export let style: string;
</script>

<main {style}>
    <slot></slot>
</main>

<style>
    main {
        position: absolute;
        
        width: 300px;
        height: fit-content;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;

        padding: 12px;

        background: #1C1D1D;
        border-radius: 4px;
    }
</style>