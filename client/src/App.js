import Map from './pages/map';
import LoadData from './components/waitScreen/LoadData';

function App() {
	return (
		<LoadData>
			<Map />
		</LoadData>
	);
}

export default App;
