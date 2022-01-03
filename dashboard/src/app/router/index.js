import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('../views/pages/LoginPage'));

function Routers() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<h1>Trang này không tồn tại</h1>} />
		</Routes>
	);
}

export default Routers;
