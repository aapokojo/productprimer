import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function HowPage() {
  return (
    <PageLayout>
      <section id="strategy">
        <h1>How - Keep Focus in the Right Things</h1>
        <h4>Turning Purpose into Practice</h4>
        <h2 id="ways">Key Questions for Building Your Product Strategy</h2>
        <div className="content-text">
          Strategy takes your product's purpose to practice. Your product strategy should answer at least the following
          questions: Why should your customers care about your product? Who are those customers? How does your product
          fill the gaps in the market? How will you measure success? What do you need to build and do you have the 
          expertise and resources you need in order to build that? How do you validate what you are building is
          taking you towards the desired outcomes and towards success? 
        </div>
        <Image src="/productsuccess.jpg" alt="Product Success" width={600} height={400} className="w-full" />
        <div className="content-text">
          Strategy defines how the purpose manifests itself as a product and could mean for <i>Home for video meme creators</i> providing 
          video meme creators a place to host their videos and their community and to monetise with their content.
          For the <i>The number one online destination for fashion</i> it could be providing a large catalog of global and local fashion items, with
          competitive pricing, delivered home fast and conveniently.
        </div>
      </section>

      <section id="keytakeawaysstrategy">
        <h2>Key Takeaways</h2>
        <div className="content-text">
            Start from the outcomes and keep the focus purely on the value you want to provide. 
            Align your your users' success to your product's success. When your product enters
            the market, competitors are likely to react and hence the market is constantly evolving.
            Make sure you have the expertise and resources to constantly deliver value unattainable
            with the competitors' products.
        </div>
        <div className="content-text">
            Inspiration and Further Reading:
        <ul>
            <li>The North Star Playbook: The guide to discovering your product's North Star by Amplitude</li>
            <li>The Star Model™ by Jay R. Galbraith</li>
            <li>Radical Focus: Achieving Your Most Important Goals with Objectives and Key Results by Christina R. Wodtke</li>
        </ul>
        </div>
      </section>

      <div id="pagenavigation" className="pt-6 text-center text-sm">
        <Link href="/why">← Previous Chapter</Link> | <Link href="/what">Next Chapter →</Link>
      </div>
    </PageLayout>
  );
}
