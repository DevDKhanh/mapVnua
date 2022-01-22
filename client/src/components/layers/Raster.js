import { memo } from 'react';
import { ImageOverlay } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { API } from '../../constant/config';

function Raster({ data }) {
	const bounds = new LatLngBounds(
		[data.latSW, data.lngSW],
		[data.latNE, data.lngNE],
	);
	return (
		<ImageOverlay
			url={`${API}/upload${data.path}`}
			bounds={bounds}
			zIndex={data.zIndex}
		/>
	);
}

export default memo(Raster);
