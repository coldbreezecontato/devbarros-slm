"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileSpreadsheet, FileUp, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NFPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ moved: string[]; skipped: string[]; notFound: string[] } | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setResult(null);
    setTimeTaken(null);

    const start = performance.now();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_URL = process.env.NEXT_PUBLIC_NF_API_URL + "/api/nf/process-sheet";

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Erro ao processar planilha");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Erro inesperado ao enviar");
    } finally {
      const end = performance.now();
      setTimeTaken((end - start) / 1000);
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center">

      <Card className="w-[550px] bg-[#0D1117] border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <FileSpreadsheet className="h-5 w-5 text-blue-400" />
            Movimentação de Notas Fiscais
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-gray-200">

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Selecione uma planilha XLSX:</p>
            <Input
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-gray-200"
            />
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Movendo arquivos...
              </>
            ) : (
              <>
                <FileUp className="h-5 w-5" />
                Enviar{file ? `: ${file.name}` : ""}
              </>
            )}
          </Button>

          {/* Resultado */}
          {result && (
            <div className="space-y-6">

              <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                <p>📤 Movidos: {result.moved.length}</p>
                <p>⚠️ Já estavam fora da pasta: {result.skipped.length}</p>
                <p>❌ Não encontrados: {result.notFound.length}</p>
                {timeTaken && <p>⏱️ Tempo: {timeTaken.toFixed(2)}s</p>}
              </div>

              {result.moved.length > 0 && (
                <section>
                  <h3 className="font-semibold text-white mb-2">📤 Movidos</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.moved.map((nf) => (
                      <Badge key={nf} variant="default">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {result.skipped.length > 0 && (
                <section>
                  <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Já estavam movidos</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.skipped.map((nf) => (
                      <Badge key={nf} variant="secondary">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}

              {result.notFound.length > 0 && (
                <section>
                  <h3 className="font-semibold text-red-400 mb-2">❌ Não Encontrados</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.notFound.map((nf) => (
                      <Badge key={nf} variant="destructive">{nf}</Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
