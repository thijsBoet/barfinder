import React, { useRef } from 'react';
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useJsApiLoader,
} from '@react-google-maps/api';
import { useQuery } from 'react-query';
// API calls
import { fetchNearbyPlaces } from './api';
// Map Settings
import { containerStyle, center, options } from './settings';
// Image
import beerIcon from './images/beer.svg';
// Styles
import { Wrapper, LoadingView } from './App.styles';

export type MarkerType = {
	id: string;
	location: google.maps.LatLngLiteral;
	name: string;
	phone_number: string;
	website: string;
};

const App: React.FC = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY!,
	});

	const mapRef = useRef<google.maps.Map<Element> | null>(null);

	const [clickedPos, setClickedPos] = React.useState<google.maps.LatLngLiteral>(
		{} as google.maps.LatLngLiteral
	);

	const {
		data: nearbyPositions,
		isLoading,
		isError,
	} = useQuery(
		[clickedPos.lat, clickedPos.lng],
		() => fetchNearbyPlaces(clickedPos.lat, clickedPos.lng),
		{
			enabled: !!clickedPos.lat,
			refetchOnWindowFocus: false,
		}
    );
  
  console.log(nearbyPositions);
  

	const onLoad = (map: google.maps.Map<Element>): void => {
		mapRef.current = map;
	};

	const onUnMount = (): void => {
		mapRef.current = null;
	};

	const onMapClick = (e: google.maps.MapMouseEvent): void => {
		setClickedPos({lat: e.latLng.lat(), lng: e.latLng.lng()});
  };
  
  const onMarkerClick = (marker: MarkerType): void => {
    console.log(marker);
    
  }

	if (!isLoaded) {
		return (
			<Wrapper>
				<LoadingView>Map Loading...</LoadingView>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<GoogleMap
				mapContainerStyle={containerStyle}
				options={options as google.maps.MapOptions}
				center={center}
				zoom={8}
				onLoad={onLoad}
				onUnmount={onUnMount}
				onClick={onMapClick}
			>
				{clickedPos.lat ? <Marker position={clickedPos} /> : null}
				{nearbyPositions?.map(marker => (
					<Marker
						key={marker.id}
						position={marker.location}
						onClick={() => onMarkerClick(marker)}
						icon={{
							url: beerIcon,
							// origin: new window.google.maps.Point(0, 0),
							// anchor: new window.google.maps.Point(15, 15),
							scaledSize: new window.google.maps.Size(30, 30),
						}}
					/>
				))}
			</GoogleMap>
		</Wrapper>
	);
};

export default App;
