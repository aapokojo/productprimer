import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import RichTextRenderer from "@/components/RichTextRenderer";
import TableOfContents from "@/components/TableOfContents";
import { getPageContent } from "@/lib/contentful";

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800;

export default async function Home() {
  const pageContent = await getPageContent('introduction');
  
  // If we have content from Contentful, use it
  if (pageContent && pageContent.content) {
    return (
      <PageLayout>
        <section id="starterguide">
          <h1>Product Primer</h1>
          <h4>A Starter Guide to Building Great* Products (*great is not always successful)</h4>
          <RichTextRenderer content={pageContent.content} />
          
          <TableOfContents />
          
          <div id="pagenavigation" className="pt-6 text-center text-sm">
            <Link href="/why">First Chapter →</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  // Fallback content if Contentful is not available or no content found
  return (
    <PageLayout>
      <section id="starterguide">
        <h1>Product Primer</h1>
        <h4>A Starter Guide to Building Great* Products (*great is not always successful)</h4>
        <h2 id="introduction">Introduction</h2>
        <div className="content-text">
          Welcome to Product Primer – <i>A Starter Guide to Building Great Products* (*great is not always successful)</i>. 
          The primer presents a collection of theoretical frameworks and practical methods for building products. 
          It challenges the conventional notion that a great product is automatically a successful one. 
          Instead, it focuses on what&apos;s in your control - empowering you build great products that serve a purpose and solve real problems.
        </div>
        <div className="content-text">
          Product work as a skill and Product Management as a craft is essentially problem solving at different abstraction levels, 
          with varying level of detail and varying lengths of iterations. The Product Primer splits product building into 
          three levels, which are addressed in the three main chapters:
          <ul>
            <li>Why - The purpose of the product: Finding the key value proposition</li>
            <li>How - Keep focus in the right things: Turning purpose into practice with a sound product strategy</li>
            <li>What - Solving users problems by building meaningful solutions</li>
          </ul>
        </div>
        <Image src="/buildlearn.jpg" alt="Build and Learn Cycle" width={600} height={400} className="w-full" />
        <div className="content-text">
          Whether you&apos;re a seasoned professional or just starting out, this primer is designed to guide you through the
          practices, structures and thinking frameworks that allow you to focus on the outcomes, building a great product 
          and learning how to make it better.
          The perspectives and advice offered in this primer are highly opinionated, 
          drawn directly from the author&apos;s own extensive experience. 
        </div>

        <TableOfContents />
      </section>

      <section id="abouttheauthor">
        <h2>About the Author</h2>
        <div className="content-text">
          Aapo Kojo has nearly two decades of experience in building digital products. 
          Some of the products he has put his work into have achieved success through strong business outcomes, 
          positive user sentiment, or prestigious awards. He has also witnessed the rapid downfall of a business giant 
          and the demise of a nearly successful startup. Throughout these varied experiences, 
          one common thread remains: the commitment to building a great product.
        </div>  
      </section>

      <div id="pagenavigation" className="pt-6 text-center text-sm">
        <Link href="/why">First Chapter →</Link>
      </div>
    </PageLayout>
  );
}
