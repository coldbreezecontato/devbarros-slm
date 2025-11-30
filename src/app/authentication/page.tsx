"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

export default function Authentication() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060A] relative overflow-hidden">

      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[200px]" />
      </div>

      {/* CARD */}
      <div className="w-full max-w-md px-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-blue-500/5 rounded-2xl p-10 animate-in fade-in zoom-in duration-700">

          {/* LOGO + TÍTULO */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-3xl font-bold text-white tracking-wide">
              DevBarros <span className="text-blue-400">System</span>
            </h1>
            <p className="text-zinc-400 text-sm">
              Plataforma segura para gerenciamento avançado
            </p>
          </div>

          {/* TABS */}
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsContent value="sign-in" className="pt-6">
              <SignInForm />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
}
