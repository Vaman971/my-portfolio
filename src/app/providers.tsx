"use client";

import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import axios from "axios";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  function hexToHSL(hex: string): string {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}


  useEffect(() => {
    async function applySiteTheme() {
      try {
        const res = await axios.get("/api/site-config");
        const theme = res.data?.theme;
        if (theme) {
          const root = document.documentElement;

          
          if (theme.primaryColor) root.style.setProperty("--primary", hexToHSL(theme.primaryColor));
          if (theme.secondaryColor) root.style.setProperty("--secondary", hexToHSL(theme.secondaryColor));
          // if (theme.backgroundColor) root.style.setProperty("--background", hexToHSL(theme.backgroundColor));
          // if (theme.textColor) root.style.setProperty("--foreground", hexToHSL(theme.textColor));

          if (theme.mode) {
            setTheme(theme.mode); // "dark" | "light"
          }
        }
      } catch (err) {
        console.error("Failed to load site theme:", err);
      }
    }

    applySiteTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      {children}
    </QueryClientProvider>
  );
}
