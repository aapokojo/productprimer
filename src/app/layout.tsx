import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Product Primer",
  description: "A Starter Guide to Building Great Products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MSWPQ1R76K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MSWPQ1R76K');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
