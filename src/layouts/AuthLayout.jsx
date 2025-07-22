import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useCursor } from "../context/CursorContext";

import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Navbar/Header/Header";
import PixalTransition from "../components/Navbar/pixalTransition/PixalTransition";
import GlobalCursor from "../components/GlobalCursor";

const AuthLayout = () => {
  const [isOpen, setOpen] = useState(false);
  const { isDesktop } = useCursor();

  return (
    <div className="relative">
      <Header isOpen={isOpen} setOpen={setOpen} />
      <Navbar open={isOpen} />
      <PixalTransition isOpen={isOpen} />
      <Outlet />
      {isDesktop && <GlobalCursor />}
    </div>
  );
};

export default AuthLayout;
