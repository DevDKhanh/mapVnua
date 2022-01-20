import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import FullScreen from '../../components/map/FullScreen';
import ListNote from '../../components/map/ListNote';
import ButtonDisplayLayer from '../../components/map/ButtonDisplayLayer';
import './styles.scss';

function Map() {
	const center = [51.505, -0.09];

	return (
		<div className="container">
			<MapContainer
				className="map_container"
				center={center}
				zoom={13}
				zoomControl={false}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<ZoomControl position="bottomright" />
				<FullScreen />
			</MapContainer>
			<ButtonDisplayLayer />
			<ListNote />
		</div>
	);
}

export default Map;
