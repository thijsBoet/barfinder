// Types
import { MarkerType } from './App';

const PLACE_RADIUS = 5000; // 2500 meters
const TYPE = 'bar';

export const fetchNearbyPlaces = async (
	lat: number,
	lng: number
): Promise<MarkerType[]> => {
	const response = await fetch(
		`https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&language=en&radius=${PLACE_RADIUS}&type=${TYPE}`,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
				'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
			},
		}
	);

	if (!response.ok) {
		throw new Error('Failed to fetch places');
	}

	const data = await response.json();
	return data.results;
};
