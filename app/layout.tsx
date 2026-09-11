import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURELIA — The Horizon Atelier | Monograph MMXXVI",
  description: "Haute Architecture, Horology, Maritime Engineering, and Private Aviation.",
  keywords: [
    "Aurelia",
    "Horizon Atelier",
    "Luxury Architecture",
    "Haute Horlogerie",
    "Private Aviation",
    "Ray Atelier",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="relative bg-[#001D39] text-[#BDD8E9] font-sans antialiased selection:bg-[#E29B4A] selection:text-[#001224]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
