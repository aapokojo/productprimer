import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Shippori_Mincho } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-shippori-mincho"
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
      <body className={`${inter.variable} ${shipporiMincho.variable}`}>
        <div className="content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
