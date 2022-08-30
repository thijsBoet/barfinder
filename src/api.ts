// Types
import { MarkerType, WeatherType } from './App';

const PLACE_RADIUS = 5000; // 5000 meters
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

export const fetchWeather = async (marker: MarkerType): Promise<WeatherType> => {
    const response = await fetch(
			`https://yahoo-weather5.p.rapidapi.com/weather?lat=${marker.location.lat}&long=${marker.location.lng}&format=json&u=c`,
			{
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
					'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
				},
			}
    );

	if (!response.ok) {
		throw new Error('Failed to fetch places');
	}

	const data = await response.json();
    return {
        temp: data.current_observation.condition.temperature,
        text: data.current_observation.condition.text,
    };
};