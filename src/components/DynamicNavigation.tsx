import { getAllPagesOrdered } from "@/lib/contentful";
import DynamicNavigationClient from "./DynamicNavigationClient";

// Map page names to URLs for existing static routes (case-insensitive)
const PAGE_URL_MAP: Record<string, string> = {
  'introduction': '/',
  'why': '/why',
  'how': '/how', 
  'what': '/what',
  'summary': '/summary'
};

// Map page names to subtitles (case-insensitive)
const PAGE_SUBTITLE_MAP: Record<string, string> = {
  'introduction': 'Introduction',
  'why': 'Finding the Key Value Proposition',
  'how': 'Turning Purpose into Practice with a Sound Strategy',
  'what': 'Solving for Users Problems',
  'summary': 'Rinse and Repeat'
};

// Helper function to get value from map case-insensitively
function getFromMap(map: Record<string, string>, key: string): string {
  const lowerKey = key.toLowerCase();
  return map[lowerKey] || '';
}

export default async function DynamicNavigation() {
  let pages = await getAllPagesOrdered();
  
  // Fallback to default navigation if Contentful is not available
  if (!pages || pages.length === 0) {
    pages = [
      { pageName: 'introduction', header: 'Introduction', subHeader: 'Getting Started', pageNumber: 1, content: null },
      { pageName: 'why', header: 'Why', subHeader: 'Finding Purpose', pageNumber: 2, content: null },
      { pageName: 'how', header: 'How', subHeader: 'Building Strategy', pageNumber: 3, content: null },
      { pageName: 'what', header: 'What', subHeader: 'Creating Solutions', pageNumber: 4, content: null },
      { pageName: 'summary', header: 'Summary', subHeader: 'Putting It Together', pageNumber: 5, content: null }
    ];
  }

  const navigationItems = pages.map(page => ({
    name: page.header || page.pageName, // Use header from Contentful, fallback to pageName
    url: getFromMap(PAGE_URL_MAP, page.pageName) || `/${page.pageName.toLowerCase()}`,
    subtitle: page.subHeader || getFromMap(PAGE_SUBTITLE_MAP, page.pageName) || '', // Use subHeader from Contentful, fallback to hardcoded map
    pageNumber: page.pageNumber
  }));

  return <DynamicNavigationClient items={navigationItems} />;
}
