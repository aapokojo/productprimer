import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import DynamicPageNavigation from "@/components/DynamicPageNavigation";
import { getPageNavigation, getAllPageSlugs } from "@/lib/contentful";
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
  const { currentPage, previousPage, nextPage, navigationPages } = await getPageNavigation(slug);
  
  if (!currentPage) {
    notFound();
  }

  return (
    <PageLayout navigationPages={navigationPages}>
      <section>
        <h1>{currentPage.header}</h1>
        {currentPage.subHeader && <h4>{currentPage.subHeader}</h4>}
        <RichTextRenderer content={currentPage.content} />
        <DynamicPageNavigation previousPage={previousPage} nextPage={nextPage} />
      </section>
    </PageLayout>
  );
}

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;
