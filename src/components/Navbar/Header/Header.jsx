import styles from "./style.module.scss";
import { useContext } from "react";
import { CursorContext } from "../../../context/CursorContext";
import useMagnetic from "../../hooks/useMagnetic";

export default function Index({ isOpen, setOpen }) {
  const { scaleDownCursor, scaleUpCursor } = useContext(CursorContext);
  const magneticRef = useMagnetic(1.5);

  return (
    <div
      className={styles.header}
      onMouseEnter={scaleDownCursor}
      onMouseLeave={scaleUpCursor}
    >
      <div
        ref={magneticRef}
        onClick={() => setOpen(!isOpen)}
        className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
      >
      </div>
    </div>
  );
}
