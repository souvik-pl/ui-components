import "./App.css";
import { useState, useRef, useEffect } from "react";

export function NavMenu({ children }) {
  return <nav className="navmenu">{children}</nav>;
}

export function DropdownMenu({ label, menuList, top, left }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => document.removeEventListener("mousedown", clickOutsideHandler);
  }, []);

  return (
    <div
      role="menu"
      className="ddContainer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="ddTrigger"
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={(e) => e.stopPropagation()}
        aria-expanded={isOpen}
      >
        {label} \/
      </button>
      {isOpen && (
        <ul ref={ref} className="ddMenu" style={{ top, left }}>
          {menuList.map((menu, index) => {
            if (menu.type === "link") {
              return (
                <li role="menuitem" key={index} className="ddMenuListItem">
                  <MenuLink label={menu.label} href={menu.href} />
                </li>
              );
            } else {
              return (
                <li role="menuitem" key={index} className="ddMenuListItem">
                  <DropdownMenu
                    label={menu.label}
                    menuList={menu.menuList}
                    top="0"
                    left="100%"
                  />
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
}

export function MenuLink({ label, href }) {
  return (
    <a href={href} className="ddMenuItem">
      {label}
    </a>
  );
}
