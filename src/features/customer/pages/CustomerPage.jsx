import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";

import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";

const EditarIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeletarIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      await api.post(`/api/establishments/${establishmentId}/clients`, clientData);
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
      privateNotes: privateNotes,
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

  const handleDeleteCustomer = async (clientDataId) => {
    if (!establishmentId || !clientDataId) return;
    if (window.confirm("Deseja excluir este cliente?")) {
      try {
        await api.delete(`/api/establishments/${establishmentId}/clients/${clientDataId}`);
        fetchCustomers(establishmentId);
      } catch (err) {
        console.error("Erro ao deletar cliente:", err);
        setError("Erro ao deletar cliente.");
      }
    }
  };

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
    <div>
      <div className="page-header">
        <h1 className="titulo-secao-dashboard">Meus Clientes</h1>
        <Button onClick={() => openModal()}>Adicionar Cliente</Button>
      </div>

      <Card>
        <h3 className="widget-titulo">Lista de Clientes</h3>
        {error && <p className="error-message">{error}</p>}
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Última Visita</th>
                <th>Agendamentos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6">Carregando...</td></tr>
              ) : customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.clientName}</td>
                    <td>{c.clientEmail || "N/A"}</td>
                    <td>{c.clientPhone || "N/A"}</td>
                    <td>{c.lastVisit || "N/A"}</td>
                    <td>{c.appointments || 0}</td>
                    <td className="actions-cell">
                      <button className="action-button icon-button" onClick={() => openModal(c)}>
                        <EditarIcone />
                      </button>
                      <button className="action-button icon-button delete" onClick={() => handleDeleteCustomer(c.id)}>
                        <DeletarIcone />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">Nenhum cliente cadastrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <Modal onClose={closeModal}>
          <h2>{selectedCustomer ? "Editar Cliente" : "Adicionar Cliente"}</h2>
          <form onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}>
            <div className="form-group">
              <label>Nome</label>
              <Input type="text" value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <Input type="email" value={newCustomerEmail} onChange={(e) => setNewCustomerEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <Input type="text" value={newCustomerPhone} onChange={(e) => setNewCustomerPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Notas Privadas</label>
              <Input as="textarea" value={privateNotes} onChange={(e) => setPrivateNotes(e.target.value)} />
            </div>
            <div className="modal-actions">
              <Button type="button" variant="secondary" onClick={closeModal}>Cancelar</Button>
              <Button type="submit">{selectedCustomer ? "Salvar Alterações" : "Adicionar"}</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}