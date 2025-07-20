import { useState } from "react";
import { CursorProvider } from "./context/CursorContext";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Navbar/Header/Header";
import PixalTransition from "./components/Navbar/pixalTransition/PixalTransition";
import Home from "./pages/Home";
import GlobalCursor from "./components/GlobalCursor";
import { useCursor } from "./context/CursorContext";

function AppContent() {
  const [isOpen, setOpen] = useState(false);
  const { isDesktop } = useCursor();

  return (
    <div className="relative">
      <Header isOpen={isOpen} setOpen={setOpen} />
      <Home />
      <Navbar open={isOpen} />
      <PixalTransition isOpen={isOpen} />
      {isDesktop && <GlobalCursor />}
    </div>
  );
}

function App() {
  return (
    <CursorProvider>
      <AppContent />
    </CursorProvider>
  );
}

export default App;