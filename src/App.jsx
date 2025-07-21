import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from "./context/CursorContext";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>
          {/* you could also add a fallback 404 page here */}
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  );
}

export default App;
