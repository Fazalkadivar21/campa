import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CursorProvider } from "./context/CursorContext";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Loading from "./components/Loading";
import { Suspense } from "react";

function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:name" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
            </Route>
            {/* you could also add a fallback 404 page here */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CursorProvider>
  );
}

export default App;
