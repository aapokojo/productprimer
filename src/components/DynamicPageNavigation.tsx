import Link from "next/link";
import { NavigationItem } from "@/lib/contentful";

interface DynamicPageNavigationProps {
  previousPage: NavigationItem | null;
  nextPage: NavigationItem | null;
}

export default function DynamicPageNavigation({ previousPage, nextPage }: DynamicPageNavigationProps) {
  return (
    <div id="pagenavigation" className="pt-6 text-center text-sm">
      {previousPage && (
        <>
          <Link href={previousPage.isIntroduction ? "/" : `/${previousPage.pageName}`}>
            ← {previousPage.isIntroduction ? "Introduction" : "Previous Chapter"}
          </Link>
          {nextPage && " | "}
        </>
      )}
      {nextPage && (
        <Link href={`/${nextPage.pageName}`}>
          {nextPage.isSummary ? "Summary" : "Next Chapter"} →
        </Link>
      )}
    </div>
  );
}
