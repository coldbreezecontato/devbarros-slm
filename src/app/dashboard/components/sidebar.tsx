"use client";

import Link from "next/link";
import { Home, Layers, Settings, LogOut } from "lucide-react";
import { logout } from "@/actions/logout";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0D1117] border-r border-white/10 px-6 py-8 flex flex-col shadow-2xl shadow-blue-500/10">
      
      <div className="text-2xl font-bold text-white mb-10 tracking-wide">
        DevBarros <span className="text-blue-400">System</span>
      </div>

      <nav className="flex flex-col gap-4 text-zinc-400 text-sm">
        <Link href="/dashboard" className="flex items-center gap-3 p-2 hover:text-white hover:bg-white/5 rounded-lg transition">
          <Home size={18} /> Início
        </Link>

         {/*
        <Link href="/dashboard/projects" className="flex items-center gap-3 p-2 hover:text-white hover:bg-white/5 rounded-lg transition">
          <Layers size={18} /> Sistemas
        </Link>

        <Link href="/dashboard/settings" className="flex items-center gap-3 p-2 hover:text-white hover:bg-white/5 rounded-lg transition">
          <Settings size={18} /> Configurações
        </Link>
        */}
      </nav>

      {/* LOGOUT */}
      <form action={logout} className="mt-auto pt-10">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 p-2 rounded-lg transition w-full">
          <LogOut size={18} /> Sair
        </button>
      </form>
    </aside>
  );
}
