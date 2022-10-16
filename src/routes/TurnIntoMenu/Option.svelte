<script lang="ts">
    export let icon: ConstructorOfATypedSvelteComponent | undefined = undefined;
    export let text: string;
    export let key: string = "";
    export let action: () => void;
    export let selected: boolean = false;
</script>

<button on:click={action} class:selected={selected}>
    {#if icon}
        <svelte:component this={icon}></svelte:component>
    {/if}
    {text} <span>{key}</span>
</button>

<style>
    button {
        width: 100%;
        height: 28px;
        
        font-family: sans-serif;
        font-size: 14px;

        background: transparent;        
        color: #ECEDEC;
        border-radius: 2px;

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 12px;
        gap: 6px;
        
        outline: none;
        cursor: pointer;
        border: none;
    }

    button:hover, .selected {
        background: #282929;
    }

    span {
        font-family: sans-serif;
        font-size: 14px;
        
        color: #A1A1A0;
        margin-left: auto;
    }
</style>