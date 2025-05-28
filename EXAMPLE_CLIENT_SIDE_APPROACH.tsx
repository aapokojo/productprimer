// Example: Client-side fetching for live updates
'use client';

import { useState, useEffect } from 'react';
import { getPageContent, PageContent } from "@/lib/contentful";

export default function ClientSidePage() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const content = await getPageContent('introduction');
        setPageContent(content);
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
    
    // Optional: Set up polling for live updates
    const interval = setInterval(fetchContent, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{pageContent?.header}</h1>
      {/* Content updates automatically every minute */}
    </div>
  );
}
