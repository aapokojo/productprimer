import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function WhatPage() {
  return (
    <PageLayout>
      <section id="tactics">
        <h1>What - Building meaningful solutions</h1>
        <h4>Solving Users Problems</h4>
        <h2 id="building">Addressing Needs with Desirable Outcomes</h2>
        <div className="content-text">
          Building solutions is about translating users' needs into desired outcomes, both for the user and your product, and
          essentially to your business.
        </div>
        <Image src="/userneedstooutcomes.jpg" alt="User needs to outcomes" width={600} height={400} className="w-full" />
        <h2 id="journeymapping">Mapping Your users' Needs</h2>
        <div className="content-text">
          To understand what you need to build, you need to understand how users are currently getting their jobs done.
          This can be done by for example journey-mapping, breadboarding or creating user flows. Whatever it may
          be called, the key is to listen to your users, observe what they do and see it for yourself.
          Going directly to the users help you both understand the journey the currently take, but also uncover the
          painpoints in the process and feel the users' emotions as they navigate through their tasks.
        </div>
        <Image src="/useractions.jpg" alt="User actions" width={600} height={400} className="w-full" />
        <div className="content-text">
          Understanding the users journey in your own product will also help in building analyses on the users 
          journey, or funnel, through the product. Data on the user funnels help you identify potential improvement points, 
          and asking your users will give you insights on what may cause people not to proceed to the desired outcomes.
          Listening to the user's language also helps you adjust your product to fit the users thinking and mental models.
        </div>
      </section>

      <section id="keytakeawaystactics">
        <h2>Key Takeaways</h2>
        <div className="content-text">
            Observe what users do and ask what they aspire to achieve. Build for what they need, not what they want.
            Use quantitative data to understand the general behaviors of what users do. Use qualitative feedback from users to understand
            why they do what they do and don't do. Address the user's need with a solution that is focused on achieving the desired outcome.
            Measure how your solution leads to the desired outcomes.
        </div>
        <div className="content-text">
            Inspiration and Further Reading:
        <ul>
            <li>Shape Up: Stop Running in Circles and Ship Work that Matters by Ryan Singer</li>
            <li>Continuous Discovery Habits by Teresea Torres</li>
            <li>Design for How People Think: Using Brain Science to Build Better Products by John Whalen</li>
            <li>Competing Against Luck: The Story of Innovation and Customer Choice by Clayton M. Christensen</li>
            <li>Change by Design: How Design Thinking Transforms Organizations and Inspires Innovation by Tim Brown</li>
        </ul>
        </div>
      </section>

      <div id="pagenavigation" className="pt-6 text-center text-sm">
        <Link href="/how">← Previous Chapter</Link> | <Link href="/summary">Summary →</Link>
      </div>
    </PageLayout>
  );
}
