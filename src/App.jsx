import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CursorProvider } from "./context/CursorContext";
import { lazy } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const About = lazy(() => import("./pages/About"));

import ScrollToTop from "./components/ScrollToTop";
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
