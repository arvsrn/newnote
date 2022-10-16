<script lang="ts">
    import Meta from "./Meta.svelte";
    import Text from "./Text.svelte";

    import Selecto from "svelte-selecto";
    import ListView from 'svelte-sortable-flat-list-view';
    import { onMount } from 'svelte';

    interface Block {
        type: "text" | "heading" | "quote" | "code" | "sub-heading" | "title";
        color: "white" | "grey" | "red" | "orange" | "brown" | "pink" | "purple" | "blue" | "green";
        content: string;
    }

    const addNewText = (i: number) => {
        blocks.splice(i, 0, {type: "text", content: "", color: "white"});
        focused = i + 1;
        blocks = blocks;
        console.log(i, focused);
    };

    const selected = (el: HTMLElement) => el.style.background = "rgba(1, 145, 254, 0.17)";
    const unselected = (el: HTMLElement) => el.style.background = "transparent";

    let blocks: Block[] = [{type: "text", content: "", color: "white"}];
    let selecto: boolean = false;
    let focused: number = 0;

    onMount(() => selecto = true);
</script>

{#each blocks as block, i}
    <Text {addNewText} bind:content={blocks[i].content} bind:type={blocks[i].type} {i} focused={i == focused} onDragStart={() => {selecto = false}} onDragEnd={() => {selecto = true}}/>
{/each}

<!--
    Document does not exist in the server, 
    so this must be rendered only on the client
-->
{#if selecto}
    <Selecto
        container={document.body}
        dragContainer={window}
        selectableTargets={[".block"]}
        selectByClick={false}
        selectFromInside={true}
        keyContainer={window}
        hitRate={0}
        preventRightClick={true}
        on:select={({ detail: e }) => {
            e.added.forEach(selected);
            e.removed.forEach(unselected);
        }}
    />
{/if}