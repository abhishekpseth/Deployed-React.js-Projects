import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useState } from "react";

const Navigation = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClose = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <nav>
      <div className="logo">
        <img src="/images/brand_logo.png" alt="logo" />
      </div>

      <div className="options">
        <ul>
          <a href="">
            <li>Menu</li>
          </a>
          <a href="">
            <li>Location</li>
          </a>
          <a href="">
            <li>About</li>
          </a>
          <a href="">
            <li>Contact</li>
          </a>
        </ul>

        <div>
          <button>login</button>
        </div>
      </div>

      {!showDrawer && (
        <div className="menu_bar" onClick={onClose}>
          <FaBars />
        </div>
      )}

      <div className={`menu_mobile ${showDrawer ? "open" : ""}`}>
        <div className="close_btn_container">
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
