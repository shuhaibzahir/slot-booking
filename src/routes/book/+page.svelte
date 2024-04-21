<script>
	import { store } from '../../store/store.js';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	let slot = null;
	let unsubscribe;
	let vehicleNumber = '';

	// Function to handle input changes
	function handleInput(event) {
		vehicleNumber = event.target.value;
	}

	function handleBooking() {
		const slots = localStorage.getItem("slots") ? JSON.parse(localStorage.getItem("slots")) : []
        const findSlot = slots.find(i=>i.id == slot.id)
        findSlot.bookings.push({ startDate: slot.startDate, endDate: slot.endDate, vehicleNumber: vehicleNumber });
        localStorage.setItem("slots", JSON.stringify(slots));
        goto("/")
	}

	onMount(() => {
		unsubscribe = store.subscribe((state) => {
			slot = state.slot;
			if (!slot) {
				goto('/');
			}
		});
	});
</script>

<div class="d-flex flex-column align-items-center justify-content-center h100vh">
	<div class="h1">Booking window</div>
	<div class="mb-3">
		<input
			type="text"
			class="form-control"
			bind:value={vehicleNumber}
			on:input={handleInput}
			placeholder="enter vehicle number"
		/>
	</div>
	<button on:click={handleBooking} class="btn btn-outline-primary">confirm</button>
</div>

<style>
	.h100vh {
		height: 100vh;
	}   
</style>
