import Link from "next/link";

export default function DashboardPage() {
  const systems = [
    {
      title: "Gerenciador de XML",
      desc: "Conversão e processamento de arquivos NF-e",
      href: "/dashboard/xml",
    },
    {
      title: "Gerenciador de Notas Fiscais",
      desc: "Mover nfs para proxima fatura",
      href: "/dashboard/nf",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {systems.map((s, i) => (
        <Link
          key={i}
          href={s.href}
          className="group bg-[#11161D] border border-white/5 hover:border-blue-500/50 rounded-xl p-6 shadow-lg shadow-black/40 hover:shadow-blue-500/10 transition-all duration-300"
        >
          <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-blue-400">
            {s.title}
          </h3>
          <p className="text-zinc-400 text-sm">{s.desc}</p>
        </Link>
      ))}

    </div>
  );
}
