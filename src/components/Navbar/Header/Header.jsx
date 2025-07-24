import styles from "./style.module.scss";
import { useContext } from "react";
import { CursorContext } from "../../../context/CursorContext";
import useMagnetic from "../../hooks/useMagnetic";
import { useCursor } from "../../../context/CursorContext";
import GlassSurface from "../../ReactBits/GlassSurface";

export default function Index({ isOpen, setOpen }) {
  const { scaleDownCursor, scaleUpCursor } = useContext(CursorContext);
  const magneticRef = useMagnetic(1.5);
  const { setCursorProps, isDesktop } = useCursor();

  const handleMouseEnter = () => {
    setCursorProps({ text: "", scale: 38, color: "bg-[#00194a]" });
  };

  const handleMouseLeave = () => {
    setCursorProps({ text: "", scale: 20 });
  };

  return (
    <div
      className={styles.header}
      onMouseEnter={scaleDownCursor}
      onMouseLeave={scaleUpCursor}
    >
      <GlassSurface
        width={50}
        height={50}
        borderRadius={100}
        className="cursor-pointer" // optional, add your own classes
      >
        <div
          ref={magneticRef}
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setOpen(!isOpen)}
          className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
        ></div>
      </GlassSurface>
    </div>
  );
}
