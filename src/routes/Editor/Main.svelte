<script lang="ts">
    import Meta from "./Meta.svelte";
    import Text from "./Text.svelte";

    import Selecto from "svelte-selecto";
    import ListView from 'svelte-sortable-flat-list-view';
    import { onMount } from 'svelte';
    import type { Block } from "src/global";
    import { blocks } from "../../stores";

    const addNewText = (i: number) => {
        console.log('add new text');
        let updatedBlocks = [...blocksInner];
        updatedBlocks.splice(i + 1, 0, {type: "text", content: "", color: "white", id: ''})
        focused = i + 1;
        blocks.update(_ => updatedBlocks);
    };

    const deleteSelected = (i: number) => {
        if (i > 0) {
            let updatedBlocks = [...blocksInner];
            updatedBlocks.splice(i, 1);
            blocks.update(_ => updatedBlocks);
        }
    };

    let actions = {
        deleteSelected: deleteSelected,
        addNewText: addNewText,
    }

    const selected = (el: HTMLElement) => el.classList.add('selected');
    const unselected = (el: HTMLElement) => el.classList.remove('selected');

    let blocksInner: Block[];
    let selecto: boolean = false;
    let focused: number = 0;

    blocks.subscribe(blocks_ => blocksInner = blocks_);

    $: blocksInner, console.log(JSON.stringify(blocksInner));

    onMount(() => selecto = true);
</script>

{#each blocksInner as block, i}
    <Text {actions} {i} focused={i == focused} onDragStart={() => {selecto = false}} onDragEnd={() => {selecto = true}}/>
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