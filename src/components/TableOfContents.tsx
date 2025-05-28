import Link from 'next/link';
import { getAllPagesOrdered, PageContent } from '@/lib/contentful';

export default async function TableOfContents() {
  let pages: PageContent[] = [];
  
  try {
    pages = await getAllPagesOrdered();
  } catch (error) {
    console.error('Error fetching pages for TOC:', error);
    // Fallback to static navigation
    return (
      <nav className="table-of-contents">
        <h3>Table of Contents</h3>
        <ul>
          <li><Link href="/">Introduction</Link></li>
          <li><Link href="/why">Why</Link></li>
          <li><Link href="/how">How</Link></li>
          <li><Link href="/what">What</Link></li>
          <li><Link href="/summary">Summary</Link></li>
        </ul>
      </nav>
    );
  }

  if (pages.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        {pages.map((page) => (
          <li key={page.pageName}>
            <Link href={page.pageName === 'introduction' ? '/' : `/${page.pageName}`}>
              <div className="toc-item">
                <span className="page-number">{page.pageNumber}.</span>
                <div className="page-info">
                  <div className="page-header">{page.header}</div>
                  <div className="page-subheader">{page.subHeader}</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
