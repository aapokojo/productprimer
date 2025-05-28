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
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-shippori-mincho"
});

export const metadata: Metadata = {
  title: "Product Primer",
  description: "A Starter Guide to Building Great Products",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-32x32.png',
  },
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
