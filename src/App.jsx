import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from "./context/CursorContext";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Route>
          {/* you could also add a fallback 404 page here */}
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  );
}

export default App;
