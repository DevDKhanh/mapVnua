import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LoginPage = lazy(() => import("../views/pages/LoginPage"));
const HomePage = lazy(() => import("../views/pages/HomePage"));

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<h2>Trang không tồn tại</h2>} />
    </Routes>
  );
}

export default Routers;
