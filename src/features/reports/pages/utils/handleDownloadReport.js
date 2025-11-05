import React from "react";
import ReactMarkdown from "react-markdown";
import { createRoot } from "react-dom/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import api from "../../../../services/api";

export async function handleDownloadReport(reportId, setDownloading) {
  try {
    setDownloading(true);

    const response = await api.get(`/api/reports/monthly/${reportId}`);
    const report = response.data;

    if (!report || !report.decryptedContent) {
      throw new Error("Relatório inválido para download.");
    }

    const markdownContent = report.decryptedContent.replace(/\\n/g, "\n");

    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "0";
    tempDiv.style.width = "800px";
    tempDiv.style.padding = "32px";
    tempDiv.style.background = "#ffffff";
    tempDiv.style.color = "#222";
    tempDiv.style.fontFamily = "Inter, Roboto, Arial, sans-serif";
    tempDiv.style.lineHeight = "1.7";
    tempDiv.style.wordBreak = "break-word";
    tempDiv.innerHTML = `<div class="pdf-content"></div>`;
    document.body.appendChild(tempDiv);

    const container = tempDiv.querySelector(".pdf-content");
    const root = createRoot(container);
    root.render(React.createElement(ReactMarkdown, null, markdownContent));

    await new Promise((r) => setTimeout(r, 600));

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const marginMM = 10;
    const imgWidthMM = pageWidth - marginMM * 2;
    const pxPerMm = canvas.width / imgWidthMM;

    const pageHeightPx = Math.floor(pageHeight * pxPerMm) - 30 * pxPerMm;

    let position = 0;
    let page = 0;

    while (position < canvas.height) {
      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d");

      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(pageHeightPx, canvas.height - position);

      pageCtx.fillStyle = "#fff";
      pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      pageCtx.drawImage(
        canvas,
        0,
        position,
        canvas.width,
        pageCanvas.height,
        0,
        0,
        canvas.width,
        pageCanvas.height
      );

      const pageImgData = pageCanvas.toDataURL("image/png");
      const pageImgHeightMM = pageCanvas.height / pxPerMm;

      if (page > 0) pdf.addPage();
      pdf.addImage(
        pageImgData,
        "PNG",
        marginMM,
        marginMM,
        imgWidthMM,
        pageImgHeightMM
      );

      position += pageHeightPx;
      page++;
    }

    const safeMonth = (report.reportMonth || new Date().toISOString()).replace(
      /[:]/g,
      "-"
    );

    pdf.save(`Relatorio_${safeMonth}.pdf`);
  } catch (error) {
    console.error(error);
    alert("Erro ao gerar o relatório em PDF.");
  } finally {
    if (setDownloading) setDownloading(false);
  }
}
