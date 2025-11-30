import { getServerSession } from "@/lib/session";

export default async function Header() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="w-full h-20 border-b border-white/10 bg-[#0F141A]/50 backdrop-blur-xl flex items-center justify-between px-8">
      
      <h2 className="text-xl text-white font-semibold tracking-wide">
        Painel Administrativo
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-zinc-300 text-sm">
          {user?.name}
        </span>

        {user?.image && (
          <img
            src={user.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-white/10"
          />
        )}
      </div>

    </header>
  );
}
