<script>
	import flatpickr from 'flatpickr';
	import { format } from 'date-fns';
    	import { setContext } from 'svelte';
        import { goto } from '$app/navigation';

	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	import defaultValues from '../constant/vehicleSlots.js';
	import { FOUR_WHELLER, TWO_WHELLER } from '../constant/vechicleType.js';
    import {setSlot} from "../store/store.js";
	let vehicle_type = TWO_WHELLER;
	let fromDate = '';
	let endDate = '';
	let slots = [];
	let openSlot = null;
	let validationError = '';

	let fromDatePicker;
	let toDatePicker;
    let notFound = false

	function handleSearch() {
		validationError = '';
		if (!fromDate || !endDate) {
			validationError = 'Please select dates';
			return;
		}

		const filterByType = slots.filter((i) => i.type === vehicle_type);
		const openeBooking = filterByType?.filter((i) => !i.bookings?.length);

		for (let i = 0; i < openeBooking.length; i++) {
			const exist = openeBooking[i].bookings?.every(
				(j) => !(endDate > j.startDate && fromDate < j.endDate)
			);
			if (exist || !openeBooking[i].bookings?.length) {
				openSlot = openeBooking[i];
				break;
			}
		}

       notFound=!openSlot

	}

   function handleBook() {
    setSlot({slot:{...openSlot, startDate: fromDate, endDate: endDate}});
    goto(`/book`);
	}
	onMount(() => {
		fromDatePicker = flatpickr('#from-date', {
			enableTime: true,
			minDate: 'today',
			dateFormat: 'Y-m-d H:i',
			onChange: function (selectedDates, dateStr) {
				fromDate = dateStr;
				toDatePicker.set('minDate', dateStr);
			}
		});

		toDatePicker = flatpickr('#end-date', {
			enableTime: true,
			dateFormat: 'Y-m-d H:i',
			minDate: 'today',
			onChange: function (selectedDates, dateStr) {
				endDate = dateStr;
			}
		});

		const local = localStorage.getItem('slots');
		if (!local) {
			localStorage.setItem('slots', JSON.stringify(defaultValues));
			slots = defaultValues;
		} else {
			slots = JSON.parse(local);
		}
	});

	onDestroy(() => {
		fromDatePicker?.destroy();
		toDatePicker?.destroy();
	});
</script>

<div class="container mt-5">
	<div class="row">
		<div class="row">
			<div class="col-md-6">
				<label class="form-label">Select Type:</label>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						value={TWO_WHELLER}
						bind:group={vehicle_type}
					/>
					<label class="form-check-label">Two Wheeler</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="radio"
						value={FOUR_WHELLER}
						bind:group={vehicle_type}
					/>
					<label class="form-check-label">Four Wheeler</label>
				</div>
			</div>
		</div>
	</div>
	<div class="row mt-3">
		<div class="col-md-6">
			<label class="form-label">From Date:</label>
			<input id="from-date" type="text" class="form-control" />
		</div>
	</div>
	<div class="row mt-3">
		<div class="col-md-6">
			<label class="form-label">End Date:</label>
			<input id="end-date" type="text" class="form-control" />
		</div>
	</div>

	<div class="row mt-3">
		<div class="col-md-6">
			<button class="btn btn-primary" on:click={handleSearch}>Search</button>
		</div>
	</div>
	{#if openSlot}
		<div class="alert mt-5 alert-info alert-dismissible fade show" role="alert">
			<strong>Available Slots:</strong> There are slots available for {vehicle_type} from {new Date(
				fromDate
			)} to {new Date(endDate)}. Book now!
			<button
                on:click={handleBook}
				type="button"
				class="btn btn-primary btn-sm ms-2"
				data-bs-dismiss="alert"
				 >Book</button
			>
		</div>
	{/if}
    	{#if notFound}
		<div class="alert mt-5 alert-danger alert-dismissible fade show" role="alert">
			<strong>No Available Slots:</strong> There are no slots available for {vehicle_type} from {new Date(
				fromDate
			)} to {new Date(endDate)}. Try agin!
			 
		</div>
	{/if}
</div>

<style>
	.h100vh {
		height: 100vh;
	}
</style>
