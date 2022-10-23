import { writable, type Writable } from 'svelte/store';
import type { Block } from './global';

export const showingMenu = writable(false);
export const blocks: Writable<Block[]> = writable([{content: '', type: 'text', color: 'white', id: 'init'}]);