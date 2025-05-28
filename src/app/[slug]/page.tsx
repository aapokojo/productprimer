import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import { getPageContent, getAllPageSlugs } from "@/lib/contentful";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs();
    return slugs.filter(slug => slug !== 'introduction').map((slug) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageContent = await getPageContent(slug);
  
  if (!pageContent) {
    notFound();
  }

  return (
    <PageLayout>
      <section>
        <h1>{pageContent.header}</h1>
        {pageContent.subHeader && <h4>{pageContent.subHeader}</h4>}
        
        {pageContent.content && <RichTextRenderer content={pageContent.content} />}
      </section>
    </PageLayout>
  );
}
