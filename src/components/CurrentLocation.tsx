import React, { useState } from 'react';
import { StyledBtn } from './CurrentLocation.styles';

type Props = {
	moveTo: (position: google.maps.LatLngLiteral) => void;
};

const CurrentLocation: React.FC<Props> = ({ moveTo }) => {
	const [disabled, setDisabled] = useState(false);
	return (
		<StyledBtn
			disabled={disabled}
			onClick={() => {
				setDisabled(true);
				navigator.geolocation.getCurrentPosition(position => {
					setDisabled(false);
					moveTo({
						lat: position?.coords.latitude,
						lng: position?.coords.longitude,
					});
				});
			}}
		>
			{disabled ? <p>Searching...</p> : <p>Get Current Position</p>}
		</StyledBtn>
	);
};

export default CurrentLocation;
