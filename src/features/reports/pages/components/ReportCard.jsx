import React from "react";
import styled from "styled-components";
import { IconDownload, IconEye, IconTrash } from "./Icons";
import { handleDownloadReport } from "../utils/handleDownloadReport";

export default function ReportCard({
  report,
  onView,
  onDelete,
  downloading,
  setDownloading,
}) {
  return (
    <Card>
      <CardHeader>
        {"Gerado em "}
        {new Date(report.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </CardHeader>
      <CardBody />
      <CardActions>
        <IconButton
          color="blue"
          title="Visualizar"
          onClick={() => onView(report.id)}
        >
          <IconEye />
        </IconButton>
        <IconButton
          color="green"
          title="Baixar PDF"
          onClick={() => handleDownloadReport(report.id, setDownloading)}
          disabled={downloading}
        >
          <IconDownload />
        </IconButton>
        <IconButton
          color="red"
          title="Excluir"
          onClick={() => onDelete(report.id)}
        >
          <IconTrash />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
`;

const CardHeader = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const CardBody = styled.div`
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ffe2cf, #fef6f1);
  margin: 1rem 0;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.6rem;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  transition: background 0.25s ease, transform 0.2s;

  &:hover {
    background: ${({ color }) =>
      color === "blue"
        ? "rgba(59, 130, 246, 0.15)"
        : color === "green"
        ? "rgba(34, 197, 94, 0.15)"
        : "rgba(239, 68, 68, 0.15)"};
    color: ${({ color }) =>
      color === "blue" ? "#2563eb" : color === "green" ? "#16a34a" : "#dc2626"};
    transform: scale(1.08);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
