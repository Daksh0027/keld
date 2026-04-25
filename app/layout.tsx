import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: 'Keld — City of Constructed Systems',
  description: 'A portfolio by [YOUR NAME]. Full-stack systems. Every interface load-bearing.',
  openGraph: {
    title: 'Keld — City of Constructed Systems',
    description: 'A portfolio by [YOUR NAME]. Full-stack systems. Every interface load-bearing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[var(--color-keld-bg)] text-[var(--color-keld-text)] font-mono antialiased flex flex-col selection:bg-[var(--color-keld-stamp)] selection:text-[var(--color-keld-stamptext)]">
        {children}
      </body>
    </html>
  );
}
