import Header from "../../components/layouts/Header";
import LoadData from "../../components/waitScreen/LoadData";
import Map from "../map";

function Home() {
  return (
    <LoadData>
      <Header />
      <Map />
    </LoadData>
  );
}

export default Home;
