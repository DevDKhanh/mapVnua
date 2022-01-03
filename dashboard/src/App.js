import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routers from './app/router';

function App() {
	return (
		<Router>
			<Suspense fallback={null}>
				<Routers />
			</Suspense>
		</Router>
	);
}

export default App;
