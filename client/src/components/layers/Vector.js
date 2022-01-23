import { memo, useEffect, useState, useMemo } from 'react';

import { Polygon, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import uploadAPI from '../../api/upload';

function Vector({ path, data }) {
	const [file, setFile] = useState([]);
	useEffect(() => {
		if (path) {
			(async () => {
				const [res] = await uploadAPI.getFile(null, path);
				setFile(res.features);
			})();
		}
	}, [path]);

	const LayerVector = useMemo(() => {
		return file.map((item, index) => {
			if (item.geometry.type === 'Polygon') {
				const polygon = item.geometry.coordinates.map(item =>
					item.map(x => [x[1], x[0]]),
				);
				return (
					<Polygon
						key={index}
						pathOptions={{
							color: data.borderColor,
							opacity: data.opacityBorder,
							fillOpacity: data.opacityBackground,
							fillColor: data.backgroundColor,
						}}
						weight={data.widthBorder}
						positions={polygon}
					></Polygon>
				);
			} else if (item.geometry.type === 'LineString') {
				const polygon = item.geometry.coordinates.map(x => [
					x[1],
					x[0],
				]);
				return (
					<Polyline
						key={index}
						pathOptions={{
							color: data.borderColor,
							opacity: data.opacityBorder,
							fillOpacity: data.opacityBackground,
							fillColor: data.backgroundColor,
						}}
						weight={data.widthBorder}
						positions={polygon}
					></Polyline>
				);
			} else if (item.geometry.type === 'Point') {
				const point = [
					item.geometry.coordinates[1],
					item.geometry.coordinates[0],
				];
				return (
					<Marker key={index} position={point}>
						<Popup>Popup for Marker</Popup>
						<Tooltip>Tooltip for Marker</Tooltip>
					</Marker>
				);
			}
			return null;
		});
	}, [
		file,
		data.borderColor,
		data.opacityBorder,
		data.opacityBackground,
		data.backgroundColor,
		data.widthBorder,
	]);
	return <>{LayerVector}</>;
}

export default memo(Vector);
