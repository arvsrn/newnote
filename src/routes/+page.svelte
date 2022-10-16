<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Editor from './Editor/Main.svelte';
    import Hud from './Hud/Main.svelte';
    import Loader from './Loader.svelte';

    onMount(() => loading = false);

    let showHud: boolean = false;
    let loading: boolean = true;
</script>

<main>
    <Editor></Editor>
    {#if showHud}
        <Hud></Hud>
    {/if}
    {#if loading}
        <div transition:fade>
            <Loader/>
        </div>
    {/if}
</main>

<svelte:window on:mousemove={() => showHud = true} on:keydown={() => showHud = false}/>

<style>
    main {
        width: 100vw;
        height: 100vh;

        background-color: #171716;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        padding-top: 150px;
    }

    div {
        width: 100vw;
        height: 100vh;

        background-color: #171716;

        position: absolute;
        top: 0px;left: 0px;

        z-index: 100;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;

    }
</style>