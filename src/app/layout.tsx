import './globals.css';
import React from 'react';
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

export const metadata = { title: 'My Portfolio' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers> <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider></Providers>
      </body>
    </html>
  );
}
