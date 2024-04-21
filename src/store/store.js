// store.js
import { writable } from 'svelte/store';

// Initial state
 

// Create a writable store
export const store = writable({});

 

export const setSlot = (data) => {
    store.update(state => {
        return { ...state, ...data };
    });
};
