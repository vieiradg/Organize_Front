import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";
import {
  ActionButton,
  DangerButton,
  DashboardTable,
  ErrorMessage,
  ModalActions,
  ModalContent,
  ModalOverlay,
  PageContainer,
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StyledCard,
  WidgetTitulo,
} from "./customerPage.styles.js";

const EditarIcone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeletarIcone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function CustomerPage() {
  const [establishmentId, setEstablishmentId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const storedEstablishmentId = localStorage.getItem("establishmentId");
    if (storedEstablishmentId) {
      setEstablishmentId(storedEstablishmentId);
      fetchCustomers(storedEstablishmentId);
    } else {
      setError("ID do estabelecimento não encontrado. Faça login novamente.");
    }
  }, []);

  const fetchCustomers = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await api.get(`/api/establishments/${id}/clients`);
      setCustomers(response.data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
      setError("Erro ao carregar clientes. Verifique a API.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!establishmentId) return;
    const clientData = {
      name: newCustomerName,
      email: newCustomerEmail,
      phone: newCustomerPhone,
      privateNotes,
    };
    try {
      await api.post(
        `/api/establishments/${establishmentId}/clients`,
        clientData
      );
      fetchCustomers(establishmentId);
      closeModal();
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err);
      setError("Erro ao adicionar cliente.");
    }
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    if (!establishmentId || !selectedCustomer) return;
    const updatedData = {
      name: newCustomerName,
      email: newCustomerEmail,
      phone: newCustomerPhone,
      privateNotes,
    };
    try {
      await api.put(
        `/api/establishments/${establishmentId}/clients/${selectedCustomer.id}`,
        updatedData
      );
      fetchCustomers(establishmentId);
      closeModal();
    } catch (err) {
      console.error("Erro ao editar cliente:", err);
      setError("Erro ao editar cliente.");
    }
  };

  const handleDeleteCustomer = async (clientId) => {
    if (!establishmentId || !clientId) return;
    setSelectedCustomer(customers.find((c) => c.id === clientId));
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomer) return;
    try {
      await api.delete(
        `/api/establishments/${establishmentId}/clients/${selectedCustomer.id}`
      );
      fetchCustomers(establishmentId);
      setShowConfirm(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error("Erro ao deletar cliente:", err);
      setError("Erro ao deletar cliente.");
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const openModal = (customer = null) => {
    setSelectedCustomer(customer);
    setNewCustomerName(customer?.clientName || "");
    setNewCustomerEmail(customer?.clientEmail || "");
    setNewCustomerPhone(customer?.clientPhone || "");
    setPrivateNotes(customer?.privateNotes || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setNewCustomerName("");
    setNewCustomerEmail("");
    setNewCustomerPhone("");
    setPrivateNotes("");
    setShowModal(false);
  };

  return (
    <PageContainer className={showModal || showConfirm ? "blurred" : ""}>
      <PageHeader>
        <h1>Meus Clientes</h1>
        <PrimaryButton onClick={() => openModal()}>
          Adicionar Cliente
        </PrimaryButton>
      </PageHeader>

      <StyledCard>
        <WidgetTitulo>Lista de Clientes</WidgetTitulo>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <DashboardTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Carregando...</td>
              </tr>
            ) : customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.clientName}</td>
                  <td>{c.clientEmail || "N/A"}</td>
                  <td>{c.clientPhone || "N/A"}</td>

                  <td className="actions-cell">
                    <ActionButton onClick={() => openModal(c)}>
                      <EditarIcone />
                    </ActionButton>
                    <ActionButton
                      className="delete"
                      onClick={() => handleDeleteCustomer(c.id)}
                    >
                      <DeletarIcone />
                    </ActionButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nenhum cliente cadastrado.</td>
              </tr>
            )}
          </tbody>
        </DashboardTable>
      </StyledCard>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{selectedCustomer ? "Editar Cliente" : "Adicionar Cliente"}</h2>
            <form
              onSubmit={
                selectedCustomer ? handleEditCustomer : handleAddCustomer
              }
            >
              <label>Nome</label>
              <input
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={newCustomerEmail}
                onChange={(e) => setNewCustomerEmail(e.target.value)}
              />

              <label>Telefone</label>
              <input
                value={newCustomerPhone}
                onChange={(e) => setNewCustomerPhone(e.target.value)}
              />

              <label>Notas Privadas</label>
              <textarea
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
              />

              <ModalActions>
                <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                <PrimaryButton type="submit">
                  {selectedCustomer ? "Salvar" : "Adicionar"}
                </PrimaryButton>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}

      {showConfirm && (
        <ModalOverlay>
          <ModalContent>
            <h3>Confirmar exclusão</h3>
            <p>
              Deseja realmente excluir{" "}
              <strong>{selectedCustomer?.clientName}</strong>?
            </p>
            <ModalActions>
              <SecondaryButton onClick={() => setShowConfirm(false)}>
                Cancelar
              </SecondaryButton>
              <DangerButton onClick={confirmDelete}>Excluir</DangerButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}
