import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: 'City of Constructed Systems',
  description: 'A portfolio by Daksh Shastri. Full-stack systems. Every interface load-bearing.',
  openGraph: {
    title: 'City of Constructed Systems',
    description: 'A portfolio by Daksh Shastri. Full-stack systems. Every interface load-bearing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", jetbrainsMono.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] font-mono antialiased flex flex-col selection:bg-[var(--app-stamp)] selection:text-[var(--app-stamptext)]">

        {children}
      </body>
    </html>
  );
}
