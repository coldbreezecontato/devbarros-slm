import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex bg-[#0A0C10]">

      {/* SIDEBAR - FIXA */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* ÁREA DO CONTEÚDO */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* HEADER FIXO */}
        <Header />

        {/* CONTEÚDO QUE ROLA */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
