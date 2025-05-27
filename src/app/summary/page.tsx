import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function SummaryPage() {
  return (
    <PageLayout>
      <section id="summary">
        <h1>Summary</h1>
        <h4>Rinse and Repeat</h4>
        <h2 id="routine">Embrace the routine</h2>
        <div className="content-text">
            In everything you do, you get better by doing and iterating as you go.
            Focus as much of your thinking and brain power into your product building efforts and learning how your product performs and succeeds.
            Set up clear frameworks and processes so you don't need to re-invent the wheel whenever you need to evaluate your
            product's purpose, assess your strategical focus areas or think what to build next. And do all of these activties on a regular basis.
        </div>
        <Image src="/buildlearn.jpg" alt="Build and Learn Cycle" width={600} height={400} className="w-full" />
        <div className="content-text">
          Now, go and build a great product. And enjoy the ride. 
          <ul>
              <li>Why - Find your product's purpose. As market evolves, re-evaluate the relevance of your product.</li>
              <li>How - Define a strategy on how to deliver a meaningful product. Keep your focus constantly in the right things.</li>
              <li>What - Understand your users needs and focus your solutions on outcomes. Keep on a constant dialogue with your users.</li>
          </ul>
        </div>
      </section>

      <div id="pagenavigation" className="pt-6 text-center text-sm">
        <Link href="/what">← Previous Chapter</Link>
      </div>
    </PageLayout>
  );
}
