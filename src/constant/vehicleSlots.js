import { FOUR_WHELLER, TWO_WHELLER } from './vechicleType';

const common = {
	vehicleNumber: null,
	checkedInTime: null,
    bookings:[],
    from: null,
	to: null
};

export default [
	{
		id: 1,
		type: FOUR_WHELLER,
		isAvailable: true,
		...common
	},
	{
		id: 2,
		type: TWO_WHELLER,
        isAvailable: true,
		...common
	},
    {
		id: 3,
		type: TWO_WHELLER,
        isAvailable: true,
		...common
	},
    {
		id: 4,
		type: TWO_WHELLER,
        isAvailable: true,
		...common
	},
    {
		id: 5,
		type: FOUR_WHELLER,
		isAvailable: true,
		...common
	},
];
