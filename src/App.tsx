import { Routes, Route, Link, NavLink } from "react-router-dom";

import ProductsPage from './core/components/Pages/ProductsPage';
import Page404 from "./core/components/Pages/Page404";
import DetailLayout from "./core/layouts/DetailLayout";
import ProductDetailPage from "./core/components/Pages/ProductDetailPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<ProductsPage/>}/>
      <Route path="/detail/:id" element={<ProductDetailPage/>}/>
      <Route path="*" element={<Page404/>}/>
    </Routes>
  );
}

export default App;

