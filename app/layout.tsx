import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "FB Content Hub — AI-Powered Facebook Content Management",
  description:
    "Create, schedule, and automate your entire Facebook strategy in minutes with AI-driven content management.",
  keywords: [
    "facebook",
    "content management",
    "social media",
    "scheduling",
    "AI",
    "automation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className:
                "dark:bg-dark-surface dark:text-gray-100 dark:border-dark-border",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
