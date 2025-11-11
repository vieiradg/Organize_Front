import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import {
  Container,
  MonthSection,
  MonthHeader,
  MonthTitle,
  AccentBar,
  ReportCount,
  Grid,
} from "../utils/styles";
import EmptyState from "./EmptyState";
import ReportCard from "./ReportCard";
import ReportModal from "./ReportModal";

export default function ReportsSection() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const adminId = localStorage.getItem("userId");
        const res = await api.get(`/api/reports/monthly`, {
          params: { adminId },
        });
        setReports(res.data);
      } catch (err) {
        console.error("Erro ao buscar relatórios:", err);
      }
    };

    fetchReports();
  }, []);

  const handleViewReport = async (reportId) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/reports/monthly/${reportId}`);
      setMarkdown(res.data.decryptedContent.replace(/\\n/g, "\n"));
      setSelectedReport(res.data);
    } catch (err) {
      console.error("Erro ao buscar conteúdo do relatório:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await api.delete(`/api/reports/${reportId}`);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
    } catch (err) {
      console.error("Erro ao excluir relatório:", err);
    }
  };

  const grouped = reports.reduce((acc, report) => {
    const [year, monthNumber] = report.reportMonth.split("-");
    const date = new Date(Number(year), Number(monthNumber) - 1);
    const month = date.toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    if (!acc[month]) acc[month] = [];
    acc[month].push(report);
    return acc;
  }, {});

  const sortedMonths = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const noReports = sortedMonths.length === 0;

  return (
    <Container>
      {noReports ? (
        <EmptyState />
      ) : (
        sortedMonths.map((month) => (
          <MonthSection key={month}>
            <MonthHeader>
              <MonthTitle>
                <AccentBar />
                <span>{month.charAt(0).toUpperCase() + month.slice(1)}</span>
              </MonthTitle>
              <ReportCount>({grouped[month].length} relatório(s))</ReportCount>
            </MonthHeader>

            <Grid>
              {grouped[month]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onView={handleViewReport}
                    onDelete={handleDeleteReport}
                    downloading={downloading}
                    setDownloading={setDownloading}
                  />
                ))}
            </Grid>
          </MonthSection>
        ))
      )}

      {selectedReport && (
        <ReportModal
          selectedReport={selectedReport}
          markdown={markdown}
          loading={loading}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </Container>
  );
}
