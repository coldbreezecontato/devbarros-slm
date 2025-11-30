import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = await cookies();

  return auth.api.getSession({
    headers: {
      cookie: cookieStore.toString(),
    },
  });
}
