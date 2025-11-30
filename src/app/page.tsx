import Link from "next/link";
import { Button } from "@/ui/button";
import { getServerSession } from "@/lib/session";
import { logout } from "@/actions/logout";
import { allowedEmails } from "@/lib/allowed-users";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user ?? null;

  const hasAccess = user && allowedEmails.includes(user.email ?? "");

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* ===============================
          BACKGROUND VIDEO
      ================================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>

        {/* overlay escuro para contraste */}
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* ===============================
          CONTEÚDO
      ================================= */}
      <div className="text-center px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <h1 className="text-4xl font-extrabold text-white tracking-wide mb-4">
          DevBarros <span className="text-blue-400">System</span>
        </h1>

        {/* =============================
            NÃO LOGADO
        ============================== */}
        {!user && (
          <div className="mt-6">
            <Link href="/authentication">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Fazer Login
              </Button>
            </Link>
          </div>
        )}

        {/* =============================
            LOGADO
        ============================== */}
        {user && (
          <div className="mt-6 text-white">
            <p className="text-lg mb-4">
              Bem-vindo ao sistema,{" "}
              <span className="font-bold text-blue-400">{user.name}</span> 👋
            </p>

            <div className="flex flex-col items-center gap-4">

              {/* =============================
                  SE TEM ACESSO PERMITIDO
              ============================== */}
              {hasAccess && (
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Ir para o painel
                  </Button>
                </Link>
              )}

              {/* =============================
                  SEM PERMISSÃO
              ============================== */}
              {!hasAccess && (
                <div className="text-red-400 text-sm">
                  Você não tem permissão para acessar o painel.<br />
                  Consulte o administrador.
                </div>
              )}

              {/* =============================
                  LOGOUT
              ============================== */}
              <form action={logout}>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                  Sair
                </Button>
              </form>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
