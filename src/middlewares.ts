import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { allowedEmails } from "@/lib/allowed-users";

// Rota protegida
const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Se não é rota protegida → segue normal
  if (!protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // === Buscar sessão via API interna ===
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/session`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
    cache: "no-store",
  });

  const data = await res.json();
  const session = data.session;

  // === Sem sessão: redireciona para login ===
  if (!session?.user) {
    return NextResponse.redirect(new URL("/authentication", req.url));
  }

  // === Usuário está logado mas NÃO tem permissão ===
  if (!allowedEmails.includes(session.user.email)) {
    return new NextResponse("Acesso negado. Consulte o administrador.", {
      status: 403,
    });
  }

  // === Tudo certo → continua ===
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // protege dashboard e subrotas
  ],
};
