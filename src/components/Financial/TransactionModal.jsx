import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function TransactionModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState({
    description: "",
    amount_cents: 0,
    transaction_date: new Date().toISOString().split("T")[0],
    status: "PENDING",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Overlay>
      <ModalBox>
        <h2>{initialData ? "Editar Transação" : "Nova Transação"}</h2>
        <form onSubmit={handleSubmit}>
          <Label>
            Descrição:
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            Valor (R$):
            <Input
              type="number"
              step="0.01"
              name="amount_cents"
              value={form.amount_cents / 100}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount_cents: parseFloat(e.target.value) * 100,
                }))
              }
              required
            />
          </Label>

          <Label>
            Data:
            <Input
              type="date"
              name="transaction_date"
              value={form.transaction_date}
              onChange={handleChange}
              required
            />
          </Label>

          <Label>
            Status:
            <Select name="status" value={form.status} onChange={handleChange}>
              <option value="PAID">Pago</option>
              <option value="PENDING">Pendente</option>
            </Select>
          </Label>

          <Actions>
            <SaveButton type="submit">Salvar</SaveButton>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
          </Actions>
        </form>
      </ModalBox>
    </Overlay>
  );
}

/* Styled Components */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Label = styled.label`
  display: block;
  margin: 0.75rem 0;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
`;

const SaveButton = styled.button`
  background: #16a34a;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;
