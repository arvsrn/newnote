<script lang="ts">
    import ContextMenu from "../ContextMenu/Main.svelte";
    import Option from "../ContextMenu/Option.svelte";
    import { Update, CrumpledPaper, Copy, BlendingMode, Heading, Quote, LetterCaseCapitalize, DragHandleDots2 } from 'radix-icons-svelte';
    import Title from "../ContextMenu/Title.svelte";
    import TurnIntoMenu from "../TurnIntoMenu/Main.svelte"
    import TurnIntoMenuOption from "../TurnIntoMenu/Option.svelte"
    import Red from "../Icons/Red.svelte";
    import White from "../Icons/White.svelte";
    import Grey from "../Icons/Grey.svelte";
    import Pink from "../Icons/Pink.svelte";
    import Purple from "../Icons/Purple.svelte";
    import Green from "../Icons/Green.svelte";
    import Blue from "../Icons/Blue.svelte";
    import Brown from "../Icons/Brown.svelte";
    import Orange from "../Icons/Orange.svelte";
    import { onMount } from "svelte";
    import { blocks } from "../../stores";
    import type { Block } from "src/global";

    export let actions: Record<string, (i: number) => void>;

    export let i: number;
    export let focused: boolean;

    let self: HTMLDivElement;
    let main: HTMLElement;
    
    let showContextMenu: boolean = false;
    let contextMenuPosition: number[] = [0, 0];
    
    let conversionMenuPosition: number[] = [0, 0];
    let selfPosition: number[] = [0, 0];

    let style = `top: ${selfPosition[1]}px; left: ${selfPosition[0]}px`;
    let mounted: boolean = false;

    let blocksInner: Block[];
    blocks.subscribe(blocks_ => blocksInner = blocks_);
    // $: blocksInner, blocks.update(_ => blocksInner);

    const capitalise = (arg: string) => arg.charAt(0).toUpperCase() + arg.slice(1);
    const updateStyle = () => {if (dragging) style = `top: ${selfPosition[1]}px; left: ${selfPosition[0]}px;`}

    onMount(() => {
        if (focused) self.focus();
        mounted = true;
    });

    const handleEvent = () => {
        if (mounted) {
            if (dragging) onDragStart();
            else onDragEnd();
        }
    }

    let onHover: boolean = false;
    let dragging: boolean = false;

    export let onDragStart: () => void;
    export let onDragEnd: () => void;

    $: dragging, handleEvent();
    $: selfPosition, updateStyle();

    $: i, console.log(i);
</script>

<main on:mouseenter={() => onHover = true} on:mouseleave={() => onHover = false} class:dragging={dragging} {style} bind:this={main}>
    <button on:mousedown={() => dragging = true} class:showing={onHover || dragging} on:mouseenter={() => onHover = true} on:mouseleave={() => onHover = false}><DragHandleDots2 size={18}/></button>

    <div contenteditable="true" class="{blocksInner[i].type} {blocksInner[i].color} block" aria-placeholder={""} bind:this={self} on:contextmenu|preventDefault={(e) => {
        showContextMenu = true;
        contextMenuPosition = [e.clientX, e.clientY];
    }} on:keyup={(e) => {        
        if (e.key === "Enter") actions.addNewText(i);
        blocksInner[i].content = self.textContent || "";
        blocks.update(_ => blocksInner);
    }} on:focusin={() => {
        self.ariaPlaceholder = capitalise(blocksInner[i].type) + "...";
    }} on:focusout={() => {
        self.ariaPlaceholder = "";
    }}>{blocksInner[i].content}</div>
</main>

{#if showContextMenu}
<ContextMenu bind:contextMenuPosition={contextMenuPosition} bind:showContextMenu={showContextMenu}>
    <Option text="Color" action={() => {}} icon={BlendingMode}>
        <TurnIntoMenu bind:contextMenuPosition={conversionMenuPosition} slot="submenu">
            <Title>Change color</Title>
            <TurnIntoMenuOption text="White" action={() => {blocksInner[i].color = "white"; blocks.update(_ => blocksInner);}} icon={White}/>
            <TurnIntoMenuOption text="Grey" action={() => {blocksInner[i].color = "grey"; blocks.update(_ => blocksInner);}} icon={Grey}/>
            <TurnIntoMenuOption text="Red" action={() => {blocksInner[i].color = "red"; blocks.update(_ => blocksInner);}} icon={Red}/>
            <TurnIntoMenuOption text="Orange" action={() => {blocksInner[i].color = "orange"; blocks.update(_ => blocksInner);}} icon={Orange}/>
            <TurnIntoMenuOption text="Brown" action={() => {blocksInner[i].color = "brown"; blocks.update(_ => blocksInner);}} icon={Brown}/>
            <TurnIntoMenuOption text="Pink" action={() => {blocksInner[i].color = "pink"; blocks.update(_ => blocksInner);}} icon={Pink}/>
            <TurnIntoMenuOption text="Purple" action={() => {blocksInner[i].color = "purple"; blocks.update(_ => blocksInner);}} icon={Purple}/>
            <TurnIntoMenuOption text="Blue" action={() => {blocksInner[i].color = "blue"; blocks.update(_ => blocksInner);}} icon={Blue}/>
            <TurnIntoMenuOption text="Green" action={() => {blocksInner[i].color = "green"; blocks.update(_ => blocksInner);}} icon={Green}/>
    </TurnIntoMenu>
    </Option>
    <Option text="Turn into..." action={() => {}} icon={Update}>
        <TurnIntoMenu bind:contextMenuPosition={conversionMenuPosition} slot="submenu">
            <Title>Turn into</Title>
            <TurnIntoMenuOption text="Heading" action={() => {blocksInner[i].type="heading"; blocks.update(_ => blocksInner);}} icon={Heading}/>
            <TurnIntoMenuOption text="Sub Heading" action={() => {blocksInner[i].type="sub-heading"; blocks.update(_ => blocksInner);}} icon={Heading}/>
            <TurnIntoMenuOption text="Title" action={() => {blocksInner[i].type="title"; blocks.update(_ => blocksInner);}} icon={Heading}/>
            <TurnIntoMenuOption text="Text" action={() => {blocksInner[i].type="text"; blocks.update(_ => blocksInner);}} icon={LetterCaseCapitalize}/>
            <TurnIntoMenuOption text="Quote" action={() => {blocksInner[i].type="quote"; blocks.update(_ => blocksInner);}} icon={Quote}/>
        </TurnIntoMenu>
    </Option>
    <Option text="Delete" action={() => {actions.deleteSelected(i)}} icon={CrumpledPaper} key="Del"/>
    <Option text="Duplicate" action={() => {}} icon={Copy} key="Ctrl+D"/>
</ContextMenu>
{/if}

<svelte:window on:mouseup={() => dragging = false} on:mousemove={(e) => {
    selfPosition = [e.clientX, e.clientY];
}}/>

<style>
    .dragging {
        position: absolute;
    }

    div[contenteditable="true"] {
        width: 500px;
        height: fit-content;
        min-height: 30px;

        padding: 4px 4px 4px 8px;
        border-radius: 4px;

        caret-color: rgba(255, 255, 255, 0.8);
        color: #ECEDEC;

        font-family: sans-serif;
        outline: none;

        display: flex;
        align-items: center;

        transition: background 0.2s ease-in;
        word-wrap: break-word;
    }

    .text {
        font-size: 17px;
    }

    .heading {
        font-size: 26px;
        font-weight: 600;
    }

    .quote {
        font-size: 17px;
        border-left: 2px solid #343434;
        padding-left: 8px;
    }

    .sub-heading {
        font-size: 23px;
        font-weight: 600;
    }

    .title {
        font-size: 20px;
        font-weight: 600;
    }

    div[contenteditable="true"]:empty:before {
        content: attr(aria-placeholder);
        cursor: text;
        color: rgba(255, 255, 255, 0.5);
    }

    ::selection {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .blue { color: #53A8FF !important; }
    .brown { color: #DAA16F !important; }
    .green { color: #4DC28A !important; }
    .grey { color: #A0A0A0 !important; }
    .orange { color: #FF8A3F !important; }
    .pink { color: #FF6268 !important; }
    .purple { color: #BE7AF1 !important; }
    .red { color: #F06A51 !important; }
    .white { color: #ECEDEC !important; }

    button {
        background: transparent;
        outline: none; border: none;

        display: flex;
        align-items: center;
        justify-content: center;

        opacity: 0%;

        width: fit-content;
        height: fit-content;
        padding: 2px 0px;
        border-radius: 4px;

        cursor: grab;
        color: #A1A0A1;

        transition: background 0.05s ease-in-out, opacity 0.1s ease-in-out;
    }

    .showing {
        opacity: 100%;
    }

    button:hover {
        background: #282929;
    }

    main {
        width: fit-content;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 6px;
        align-items: center;
        justify-content: center;
    }
</style>