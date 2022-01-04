import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("../views/pages/LoginPage"));
const HomePage = lazy(() => import("../views/pages/HomePage"));

function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default Routers;
