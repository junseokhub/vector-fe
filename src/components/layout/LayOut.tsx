import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-4 shadow-lg">
        <Link href="/project" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
          ⚡ 내 프로젝트
        </Link>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">{children}</main>
      <footer className="bg-slate-100 border-t text-center py-4 text-sm text-slate-500">
        © 2025 내 프로젝트
      </footer>
    </div>
  );
}