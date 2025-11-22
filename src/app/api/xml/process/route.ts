import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import * as XLSX from "xlsx";

// ==============================
// TIPAGENS
// ==============================

type Nota = {
  numeroNF: string | number | undefined;
  valorNF: string | number | undefined;
  pesoBruto: string | number | undefined;
};

// ==============================
// HANDLER
// ==============================

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("xmls") as File[];

    const notas: Nota[] = [];

    for (const file of files) {
      const text = await file.text();
      const xml = await parseStringPromise(text);

      // CAPTURA PADRÃO DA NFe
      const nfe = xml?.nfeProc?.NFe?.[0];
      const infNFe = nfe?.infNFe?.[0];

      if (!infNFe) continue;

      const ide = infNFe.ide?.[0];
      const total = infNFe.total?.[0]?.ICMSTot?.[0];
      const transp = infNFe.transp?.[0];
      const vol = transp?.vol?.[0];

      // Número da NF
      const nNF = ide?.nNF?.[0];

      // Valor final da NF
      const vNF = total?.vNF?.[0];

      // PESO BRUTO — campo real do XML enviado
      const pesoBruto =
        vol?.pesoB?.[0] ||
        vol?.pesoBruto?.[0] || // fallback caso outro emissor use nome diferente
        undefined;

      notas.push({
        numeroNF: nNF,
        valorNF: vNF,
        pesoBruto,
      });
    }

    // GERA EXCEL
    const worksheet = XLSX.utils.json_to_sheet(notas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Notas");

    const buffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=notas.xlsx",
      },
    });
  } catch (error) {
    console.error("Erro no processamento:", error);
    return NextResponse.json(
      { error: "Erro ao processar XMLs" },
      { status: 500 }
    );
  }
}
