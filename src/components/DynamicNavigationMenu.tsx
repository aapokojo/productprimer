"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavigationItem } from "@/lib/contentful";

interface DynamicNavigationProps {
  pages: NavigationItem[];
}

export default function DynamicNavigation({ pages }: DynamicNavigationProps) {
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

  // Sort pages by pageNumber
  const sortedPages = [...pages].sort((a, b) => a.pageNumber - b.pageNumber);

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
        {sortedPages.map((page, index) => (
          <div key={page.pageName}>
            <Link 
              href={page.pageName === 'introduction' ? '/' : `/${page.pageName}`} 
              onClick={toggleMenu}
            >
              <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>
                {page.header}
              </h3>
              <h4 style={{ color: '#c99' }}>
                {page.subHeader}
              </h4>
            </Link>
            {index < sortedPages.length - 1 && (
              <hr style={{ margin: '8px 0' }} />
            )}
          </div>
        ))}
        <hr style={{ margin: '8px 0' }} />
        <br />
      </nav>
    </>
  );
}
