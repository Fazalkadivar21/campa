import { createContext, useState, useEffect } from "react"

export const CursorContext = createContext()

export function CursorProvider({ children }) {
  const [cursorScaledDown, setCursorScaledDown] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  const scaleDownCursor = () => {
    if (isDesktop) setCursorScaledDown(true)
  }

  const scaleUpCursor = () => {
    if (isDesktop) setCursorScaledDown(false)
  }

  return (
    <CursorContext.Provider value={{ cursorScaledDown, scaleDownCursor, scaleUpCursor }}>
      {children}
    </CursorContext.Provider>
  )
}zz
