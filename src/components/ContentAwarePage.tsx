import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import { getPageContent } from "@/lib/contentful";

interface ContentAwarePageProps {
  pageName: string;
  fallbackContent: React.ReactNode;
}

export default async function ContentAwarePage({ pageName, fallbackContent }: ContentAwarePageProps) {
  const pageContent = await getPageContent(pageName);
  
  // If we have content from Contentful, use it
  if (pageContent && pageContent.content) {
    return (
      <PageLayout>
        <section>
          <RichTextRenderer content={pageContent.content} />
        </section>
      </PageLayout>
    );
  }

  // Otherwise use the fallback content
  return (
    <PageLayout>
      {fallbackContent}
    </PageLayout>
  );
}
