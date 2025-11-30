"use server";

import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();

  await auth.api.signOut({
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  redirect("/");
}
