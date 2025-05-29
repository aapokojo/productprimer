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
        <div style={{ padding: '4px 0' }}>
          <a 
            href="/api/export-pdf"
            download="Product-Primer-by-Aapo-Kojo.pdf"
            style={{
              color: '#666',
              textDecoration: 'none',
              display: 'block',
              padding: '4px 0',
              fontSize: '0.85em'
            }}
            onClick={toggleMenu}
          >
            <div style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 600, margin: 0 }}>
              Download as PDF
            </div>
            <div style={{ color: '#999', margin: 0, fontSize: '0.9em' }}>
              Complete booklet
            </div>
          </a>
        </div>
        <br />
      </nav>
    </>
  );
}
