"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackPdfDownload } from '@/lib/analytics';

export default function Navigation() {
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
        <Link href="/" onClick={toggleMenu}>
          <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>Product Primer</h3>
          <h4 style={{ color: '#c99' }}>Introduction</h4>
        </Link>
        <hr style={{ margin: '8px 0' }} />
        
        <Link href="/why" onClick={toggleMenu}>
          <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>Why - The Purpose of the Product</h3>
          <h4 style={{ color: '#c99' }}>Finding the Key Value Proposition</h4>
        </Link>
        <hr style={{ margin: '8px 0' }} />
        
        <Link href="/how" onClick={toggleMenu}>
          <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>How - Keep Focus in the Right Things</h3>
          <h4 style={{ color: '#c99' }}>Turning Purpose into Practice with a Sound Strategy</h4>
        </Link>
        <hr style={{ margin: '8px 0' }} />
        
        <Link href="/what" onClick={toggleMenu}>
          <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>What - Building Meaningful Solutions</h3>
          <h4 style={{ color: '#c99' }}>Solving for Users Problems</h4>
        </Link>
        <hr style={{ margin: '8px 0' }} />
        
        <Link href="/summary" onClick={toggleMenu}>
          <h3 style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 700 }}>Summary</h3>
          <h4 style={{ color: '#c99' }}>Rinse and Repeat</h4>
        </Link>
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
            onClick={(e) => {
              trackPdfDownload('Product-Primer-by-Aapo-Kojo.pdf', 'navigation_menu');
              toggleMenu();
            }}
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
