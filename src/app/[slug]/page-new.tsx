import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import { getPageContent, getAllPageNames } from "@/lib/contentful";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const pageNames = await getAllPageNames();
    // Filter out 'introduction' since that's handled by the home page
    return pageNames.filter(name => name !== 'introduction').map((name) => ({
      slug: name,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageContent = await getPageContent(slug);
  
  if (!pageContent || !pageContent.content) {
    notFound();
  }

  return (
    <PageLayout>
      <section>
        <RichTextRenderer content={pageContent.content} />
      </section>
    </PageLayout>
  );
}
