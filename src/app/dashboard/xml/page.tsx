"use client";

import { useState, DragEvent } from "react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function XMLReaderPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      setFiles(e.dataTransfer.files);
      toast.success(`${e.dataTransfer.files.length} arquivo(s) selecionado(s)`);
    }
  };

  async function handleProcess() {
    if (!files) {
      toast.error("Selecione pelo menos um arquivo XML");
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("xmls", file));

    setLoading(true);
    const response = await fetch("/api/xml/process", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    if (!response.ok) {
      toast.error("Erro ao processar arquivos");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notas.xlsx";
    a.click();

    toast.success("Excel gerado com sucesso!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className="
          w-[820px] p-12 rounded-3xl shadow-2xl border border-white/10
          bg-white/5 backdrop-blur-2xl 
          relative overflow-hidden

          before:absolute before:inset-0 before:pointer-events-none

          hover:border-blue-500/40 hover:shadow-blue-500/20
          transition-all duration-500
        "
      >
        {/* TÍTULO */}
        <div className="space-y-3 text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-black bg-clip-text">
            DevBarros — Processador de XML
          </h1>
          <p className="text-gray-300 text-sm font-bold">
            Converta seus arquivos XML de Notas Fiscais em uma planilha Excel
          </p>
        </div>

        {/* ETAPAS */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-8">
          {[ "Enviar XMLs", "Processar", "Download" ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="
                  w-9 h-9 rounded-full
                  flex items-center justify-center font-bold text-white shadow-md
              ">
                {i + 1}
              </div>
              <span className="mt-2">{step}</span>
            </div>
          ))}
        </div>

        {/* ÁREA DE UPLOAD */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300

            ${isDragging
              ? "border-blue-500 bg-blue-500/10 scale-[1.02] shadow-lg shadow-blue-500/20"
              : "border-white/20 bg-white/5 hover:bg-white/10"
            }
          `}
        >
          <Upload className="mx-auto h-14 w-14 text-blue-400" />
          <p className="mt-4 text-sm text-gray-300">
            Arraste e solte os XMLs aqui<br />ou clique para selecionar
          </p>

          <input
            type="file"
            accept=".xml"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="mt-5 w-full text-gray-300 cursor-pointer bg-transparent"
          />

          {files && (
            <div className="mt-6 flex items-center justify-center gap-2 text-blue-300">
              <FileText className="h-5 w-5" />
              {files.length} arquivo(s) selecionado(s)
            </div>
          )}
        </div>

        {/* BOTÃO */}
        <Button
          onClick={handleProcess}
          disabled={loading}
          className="
            w-full h-12 mt-10 text-lg font-semibold
            hover:opacity-90 transition-all duration-300 rounded-xl
            flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20
          "
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              Gerar Excel
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
