<script lang="ts">
    import { CaretRight } from "radix-icons-svelte";

    export let icon: ConstructorOfATypedSvelteComponent | undefined = undefined;
    export let text: string;
    export let key: string = "";
    export let action: () => void;

    let showSubmenu: boolean = false;
</script>

<button on:click={action} on:mouseenter={() => showSubmenu = true} on:mouseleave={() => showSubmenu = false}>
    {#if icon}
        <svelte:component this={icon}></svelte:component>
    {/if}
    {text} <span>{key}</span>

    {#if showSubmenu && $$slots.submenu}
        <div on:mouseenter={() => showSubmenu = true} on:mouseleave={() => showSubmenu = false}><slot name="submenu"/></div>
    {/if}
</button>

<style>
    div {
        width: fit-content;
        height: fit-content;
        background: transparent;

        position: relative;
        left: 13.5px;
        top: -40px;
    }

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

    button:hover {
        background: #282929;
    }

    span {
        font-family: sans-serif;
        font-size: 14px;
        
        color: #A1A1A0;
        margin-left: auto;
    }
</style>