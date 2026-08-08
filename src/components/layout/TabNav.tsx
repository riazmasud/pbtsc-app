"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

interface TabNavProps {
  items: NavItem[];
}

export default function TabNav({ items }: TabNavProps) {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-[52px] z-30 overflow-x-auto">
      <ul className="flex min-w-max px-2">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href) && pathname.split("/").length === item.href.split("/").length + 1);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? "border-green-600 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
