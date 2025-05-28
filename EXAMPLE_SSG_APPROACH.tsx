// Example: Build-time only approach (SSG)
import { getPageContent } from "@/lib/contentful";

// This runs only at build time
export async function generateStaticParams() {
  // Pre-generate all pages at build time
  return [
    { slug: 'introduction' },
    { slug: 'why' },
    { slug: 'how' },
    { slug: 'what' },
    { slug: 'summary' }
  ];
}

export default async function StaticPage({ params }: { params: { slug: string } }) {
  // This content is fetched at BUILD TIME only
  const pageContent = await getPageContent(params.slug);
  
  return (
    <div>
      <h1>{pageContent?.header}</h1>
      {/* Content is "frozen" from build time */}
    </div>
  );
}

// Force static generation
export const dynamic = 'force-static';
