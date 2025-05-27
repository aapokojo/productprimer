import Navigation from "./Navigation";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Navigation />
      <main id="content" className="pt-6 ml-0 flex-1">
        {children}
      </main>
      <div className="footer text-footer-text font-light text-sm mt-12">
        Product Primer | <a href="mailto:aapo@productprimer.com">aapo@productprimer.com</a>
      </div>
    </>
  );
}
