import DynamicNavigationMenu from "./DynamicNavigationMenu";
import { NavigationItem } from "@/lib/contentful";

interface PageLayoutProps {
  children: React.ReactNode;
  navigationPages?: NavigationItem[];
}

export default function PageLayout({ children, navigationPages = [] }: PageLayoutProps) {
  // Fallback navigation if no pages provided
  const fallbackPages: NavigationItem[] = [
    { pageName: 'introduction', header: 'Product Primer', subHeader: 'Introduction', pageNumber: 1, isIntroduction: true, isSummary: false },
    { pageName: 'why', header: 'Why - The Purpose of the Product', subHeader: 'Finding the Key Value Proposition', pageNumber: 2, isIntroduction: false, isSummary: false },
    { pageName: 'how', header: 'How - Keep Focus in the Right Things', subHeader: 'Turning Purpose into Practice', pageNumber: 3, isIntroduction: false, isSummary: false },
    { pageName: 'what', header: 'What - Building Meaningful Solutions', subHeader: 'Solving Users Problems', pageNumber: 4, isIntroduction: false, isSummary: false },
    { pageName: 'summary', header: 'Summary', subHeader: 'Rinse and Repeat', pageNumber: 5, isIntroduction: false, isSummary: true }
  ];

  const navPages = navigationPages.length > 0 ? navigationPages : fallbackPages;

  return (
    <>
      <DynamicNavigationMenu pages={navPages} />
      <main id="content" className="pt-6 ml-0 flex-1">
        {children}
      </main>
      <div className="footer text-footer-text font-light text-sm mt-12">
        Product Primer | <a href="mailto:aapo@productprimer.com">aapo@productprimer.com</a>
      </div>
    </>
  );
}
