"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationItem {
  name: string;
  url: string;
  subtitle: string;
  pageNumber: number;
}

interface Props {
  items: NavigationItem[];
}

export default function DynamicNavigationClient({ items }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        id="menu-button"
        onClick={toggleMenu}
        style={{
          fontWeight: 600,
          display: 'block',
          position: 'fixed',
          top: '10px',
          left: '4px',
          background: '#fff',
          boxShadow: '2px 2px 1px 0 rgba(0, 0, 0, 0.1)',
          color: '#333',
          padding: '10px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 900
        }}
      >
        ☰
      </button>

      {isMenuOpen && (
        <div
          className="overlay"
          onClick={toggleMenu}
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      )}

      <nav
        id="toc"
        style={{
          left: isMenuOpen ? '0px' : '-250px'
        }}
      >
        {items.map((item, index) => (
          <div key={item.name}>
            <Link href={item.url} onClick={toggleMenu}>
              <h3 style={{ fontFamily: 'var(--font-shippori-mincho), "Shippori Mincho", serif', fontWeight: 700 }}>
                {item.name}
              </h3>
              {item.subtitle && (
                <h4 style={{ color: '#c99' }}>{item.subtitle}</h4>
              )}
            </Link>
            {index < items.length - 1 && <hr style={{ margin: '8px 0' }} />}
          </div>
        ))}
        <hr style={{ margin: '8px 0' }} />
        <br />
      </nav>
    </>
  );
}
