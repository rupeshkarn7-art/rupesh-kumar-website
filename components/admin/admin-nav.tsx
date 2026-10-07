"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/resources", label: "Resources" },
];

export function AdminNav({ newEnquiries }: { newEnquiries: number }) {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="mt-6 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {items.map((i) => {
        const active = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-[14.5px] transition-colors",
              active ? "bg-paper text-ink" : "text-paper/75 hover:bg-paper/10 hover:text-paper",
            )}
          >
            {i.label}
            {i.href === "/admin/enquiries" && newEnquiries > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] text-white">{newEnquiries}</span>
            )}
          </Link>
        );
      })}
      <a href="/" target="_blank" className="shrink-0 rounded-lg px-3 py-2 text-[14.5px] text-paper/60 lg:hidden">Site ↗</a>
      <form action="/auth/signout" method="post" className="shrink-0 lg:hidden">
        <button className="rounded-lg px-3 py-2 text-[14.5px] text-paper/60">Sign out</button>
      </form>
    </nav>
  );
}
