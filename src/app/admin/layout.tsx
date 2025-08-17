import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ModeToggle } from "@/components/admin/ModeToggle";
import { UserMenu } from "@/components/admin/UserMenu";
import MobileNav from "@/components/admin/MobileNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/signin?callbackUrl=/admin");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Skills", href: "/admin/skills" },
    { label: "Experience", href: "/admin/experience" },
    { label: "About", href: "/admin/about" },
    { label: "Site Config", href: "/admin/config" },
    { label: "Messages", href: "/admin/contact" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card shadow-lg">
        <div className="p-6 flex items-center justify-between border-b">
          <span className="text-2xl font-bold">Portfolio Admin</span>
          <ModeToggle />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-2 rounded-lg hover:bg-accent transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <div className="p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground truncate">
            {session.user?.name}
          </span>
          <UserMenu />
        </div>
      </aside>

      {/* Mobile Nav */}
      <MobileNav navItems={navItems} session={session} />

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
