"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function MobileNav({ navItems, session }: any) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Dialog.Root>
      {/* Top Nav */}
      <div className="flex justify-start items-start p-4 lg:hidden">
        <Dialog.Trigger asChild>
          <button
            aria-label="Open menu"
            className="p-2 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-black hover:opacity-80 transition"
          >
            <Menu size={22} />
          </button>
        </Dialog.Trigger>
      </div>

      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

        {/* Sidebar */}
        <Dialog.Content
          className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 p-6 flex flex-col animate-slideIn"
        >
          <VisuallyHidden>
            <Dialog.Title>Navigation Menu</Dialog.Title>
          </VisuallyHidden>

          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              aria-label="Close menu"
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <X size={24} />
            </button>
          </Dialog.Close>

          {/* User Info */}
          {session?.user && (
            <div className="mb-8 border-b pb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
              <p className="font-semibold text-lg">{session.user.name}</p>
            </div>
          )}

          {/* Nav Links */}
          <nav className="flex flex-col gap-4">
            {navItems.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-gray-800 dark:text-gray-100 hover:text-blue-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 px-4 py-2 mb-3 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:opacity-80 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          )}

          {/* Sign Out */}
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
