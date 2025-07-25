import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CursorProvider } from "./context/CursorContext";
import { TransitionProvider } from "./context/TransitionContext";
import withDelay from "./utils/withDelay";
import { lazy } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import delayedLazy from './utils/delayedLazy';

const HomeLazy = delayedLazy(() => import("./pages/Home"));
const ProductsLazy = delayedLazy(() => import("./pages/Products"));
const Login = delayedLazy(() => import("./pages/Login"));
const SignUp = delayedLazy(() => import("./pages/Signup"));
const ProductDetailsLazy = delayedLazy(() => import("./pages/ProductDetails"));
const AboutLazy = delayedLazy(() => import("./pages/About"));

const Home = withDelay(HomeLazy)
const Products = withDelay(ProductsLazy)
const ProductDetails = withDelay(ProductDetailsLazy)
const About = withDelay(AboutLazy)

import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";
import { Suspense } from "react";

function App() {
  return (
    <CursorProvider>
      <TransitionProvider>
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
      </TransitionProvider>
    </CursorProvider>
  );
}

export default App;
