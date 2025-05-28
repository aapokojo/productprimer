import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import DynamicPageNavigation from "@/components/DynamicPageNavigation";
import { getPageNavigation } from "@/lib/contentful";
import { notFound } from "next/navigation";

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

export default async function HowPage() {
  const { currentPage, previousPage, nextPage, navigationPages } = await getPageNavigation('how');
  
  if (!currentPage) {
    notFound();
  }

  return (
    <PageLayout navigationPages={navigationPages}>
      <section id="practice">
        <h1>{currentPage.header}</h1>
        <h4>{currentPage.subHeader}</h4>
        <RichTextRenderer content={currentPage.content} />
        <DynamicPageNavigation previousPage={previousPage} nextPage={nextPage} />
      </section>
    </PageLayout>
  );
}
