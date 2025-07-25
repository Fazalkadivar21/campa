import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useCursor } from "../context/CursorContext";
import { useTransition } from "../context/TransitionContext";
import gsap from "gsap";

import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Navbar/Header/Header";
import PixalTransition from "../components/Navbar/pixalTransition/PixalTransition";
import Footer from "../components/Footer";
import GlobalCursor from "../components/GlobalCursor";

function MainLayout() {
  const [isOpen, setOpen] = useState(false);
  const { isDesktop } = useCursor();
  const barba = useTransition();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    barba.init({
      sync: true,
      transitions: [
        {
          name: "default-transition",
          leave(data) {
            setIsTransitioning(true);
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                data.current.container.remove();
              },
            });
          },
          enter(data) {
            gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                setIsTransitioning(false);
              },
            });
          },
        },
      ],
    });
  }, [barba]);

  return (
    <div className="relative" data-barba="wrapper">
      <Header isOpen={isOpen} setOpen={setOpen} />
      <Navbar open={isOpen} setOpen={setOpen} />
      <PixalTransition isOpen={isTransitioning} />
      <main data-barba="container" data-barba-namespace={location.pathname}>
        <Outlet />
      </main>
      <Footer />
      {isDesktop && <GlobalCursor />}
    </div>
  );
}

export default MainLayout;
