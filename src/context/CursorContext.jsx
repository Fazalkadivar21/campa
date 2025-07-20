import { createContext, useState, useEffect, useContext } from "react";

export const CursorContext = createContext();

export function CursorProvider({ children }) {
  const yo = window.innerWidth >= 1024 ? true : false;
  const [cursorProps, setCursorProps] = useState({
    text: "",
    scale: 10,
  });
  const [isDesktop, setIsDesktop] = useState(yo);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(yo);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [isDesktop]);

  return (
    <CursorContext.Provider
      value={{
        cursorProps,
        setCursorProps,
        isDesktop,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
