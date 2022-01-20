<<<<<<< HEAD
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import Map from "./pages/Map";
=======
import Map from './pages/map';
>>>>>>> c16d138e8e5ca8dc69a3c8ae185c2cd780441b75

function App() {
  React.useEffect(() => {
    toast("test");
  }, []);
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Map />
    </React.Fragment>
  );
}

export default App;
