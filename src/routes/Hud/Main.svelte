<script lang="ts">
    import { DotsHorizontal } from "radix-icons-svelte";
    import { fade } from "svelte/transition";
    import Button from "./Button.svelte";
    import Menu from "./Menu.svelte";

    let showPageSettings: boolean = false;
</script>

<main transition:fade={{duration: 50}}>
    <div class="buttons">
        <Button onClick={() => {}}>Export</Button>
        <Button onClick={() => showPageSettings = true}>
            <DotsHorizontal/>
        </Button>
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 50px;

        background: transparent;

        position: absolute;
        top: 0px;
        left: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
    }

    div.buttons {
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 2px;

        margin-left: auto;
        padding-right: 12px;
    }   
</style>