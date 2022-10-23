<script lang="ts">
    export let onClick: () => void;
</script>

<button on:click={onClick}><slot></slot></button>

<style>
    button {
        position: relative;
        
        width: fit-content;
        height: 28px;
        padding: 5px 10px;

        color: #A0A0A0;
        background-color: transparent;
        border-radius: 4px;

        font-family: sans-serif;
        font-size: 15.5px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        outline: none;
        border: 1px solid transparent;

        transition: all 0.125s ease-in;
    }

    button:hover {
        color: white;
        background-color: #232323;
    }
</style>