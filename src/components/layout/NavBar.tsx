"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavBarProps {
  title: string;
}

export default function NavBar({ title }: NavBarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="PBTSC" width={32} height={32} className="rounded-full" />
          <div>
            <span className="font-bold text-sm leading-none block">PBTSC</span>
            <span className="text-green-300 text-xs leading-none">{title}</span>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-green-200 hidden sm:block truncate max-w-[120px]">
              {user.displayName}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
