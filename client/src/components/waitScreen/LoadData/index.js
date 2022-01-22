import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classifyAPI from '../../../api/classify';
import layerAPI from '../../../api/layer';
import { dataMapAdd } from '../../../redux/action/dataMap';

function LoadData({ children }) {
	const pageSize = 100;
	const dispacth = useDispatch();
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		(async () => {
			try {
				const [classifys] = await classifyAPI.getList(
					null,
					page,
					pageSize,
				);
				const [layers] = await layerAPI.getList(null, page, pageSize);
				dispacth(dataMapAdd(layers.records, classifys.records));
				setLoading(false);
			} catch (err) {}
		})();
	}, []);

	return <>{!loading && children}</>;
}

export default LoadData;
