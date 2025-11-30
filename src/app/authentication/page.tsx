"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

export default function Authentication() {
  return (
    <div className="min-h-screen w-full bg-[#0A0F1C] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            DevBarros
          </h1>
          <p className="text-zinc-400 text-sm mt-1 tracking-wide">
            Painel de Acesso
          </p>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="bg-[#05070e]/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6">
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid grid-cols-2 w-full bg-white/5 border border-white/10 rounded-xl">
              <TabsTrigger
                value="sign-in"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-300 rounded-lg"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger
                value="sign-up"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-zinc-300 rounded-lg"
              >
                Criar conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in" className="mt-6">
              <SignInForm />
            </TabsContent>

            <TabsContent value="sign-up" className="mt-6">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
