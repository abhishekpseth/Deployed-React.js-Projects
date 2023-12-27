import styles from "./Navigation.module.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState } from "react";

const Navigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClose = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <nav className={`${styles.navigation} container`}>
      <div>
        <img
          className={styles.logo}
          src="/images/logo.png"
          alt="do some coding"
        />
      </div>

      <ul className={styles.options}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      {!showDrawer && (
        <div className={styles.menu_bar} onClick={onClose}>
          <FaBars />
        </div>
      )}

      <div
        className={`${styles.menu_mobile} ${showDrawer ? styles.open : null}`}
      >
        <div className={styles.close_btn_container}>
          <ImCross onClick={onClose} />
        </div>
        <ul>
          <a href="" onClick={onClose}>
            <li>Menu</li>
          </a>
          <a href="" onClick={onClose}>
            <li>Location</li>
          </a>
          <a href="" onClick={onClose}>
            <li>About</li>
          </a>
          <a href="" onClick={onClose}>
            <li>Contact</li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
