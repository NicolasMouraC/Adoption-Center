import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Adopt from "../pages/Adopt";
import RegisterAnimal from "../pages/RegisterAnimal";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/register-animal" element={<RegisterAnimal />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes;