// Example: ISR approach - Cache with periodic updates
import { getPageContent, PageContent } from "@/lib/contentful";

export default async function ISRPage() {
  const pageContent: PageContent | null = await getPageContent('introduction');
  
  return (
    <div>
      <h1>{pageContent?.header}</h1>
      {/* Content cached for 1 hour, then regenerated */}
    </div>
  );
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Or use on-demand revalidation with webhooks
export const dynamic = 'force-dynamic'; // or remove for ISR
