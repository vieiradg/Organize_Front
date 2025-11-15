import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";

import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";

const EditarIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeletarIcone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export default function ServicePage() {
  const [establishmentId, setEstablishmentId] = useState("");
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    durationMinutes: "",
    priceCents: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEstablishmentId = localStorage.getItem("establishmentId");
    if (storedEstablishmentId) {
      setEstablishmentId(storedEstablishmentId);
      fetchServices(storedEstablishmentId);
    } else {
      setError("ID do estabelecimento não encontrado. Faça login novamente.");
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      setFormData({
        name: selectedService.name || "",
        durationMinutes: selectedService.durationMinutes || "",
        priceCents: selectedService.priceCents
          ? (selectedService.priceCents / 100).toFixed(2)
          : "",
      });
    } else {
      setFormData({ name: "", durationMinutes: "", priceCents: "" });
    }
  }, [selectedService]);

  const fetchServices = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/establishments/${id}/services`);
      setServices(response.data);
    } catch (err) {
      setError("Erro ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const serviceData = {
      name: formData.name,
      description: "",
      priceCents: Math.round(
        parseFloat(formData.priceCents.replace(",", ".")) * 100
      ),
      durationMinutes: parseInt(formData.durationMinutes),
      establishmentId,
    };

    try {
      if (selectedService) {
        await api.put(
          `/api/establishments/${establishmentId}/services/${selectedService.id}`,
          serviceData
        );
      } else {
        await api.post(
          `/api/establishments/${establishmentId}/services`,
          serviceData
        );
      }
      fetchServices(establishmentId);
      closeModal();
    } catch (err) {
      setError("Não foi possível salvar o serviço.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar este serviço?")) {
      try {
        await api.delete(`/api/establishments/${establishmentId}/services/${id}`);
        fetchServices(establishmentId);
      } catch (err) {
        setError("Não foi possível apagar o serviço.");
      }
    }
  };

  const openModal = (service = null) => {
    setSelectedService(service);
    if (service) {
      setFormData({
        name: service.name,
        durationMinutes: service.durationMinutes,
        priceCents: (service.priceCents / 100).toFixed(2),
      });
    } else {
      setFormData({ name: "", durationMinutes: "", priceCents: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="titulo-secao-dashboard">Gerir Serviços</h1>
        <Button onClick={() => openModal()}>Adicionar Serviço</Button>
      </div>

      <Card>
        <h3 className="widget-titulo">Serviços Oferecidos</h3>
        {error && <p className="error-message">{error}</p>}

        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Duração</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4">Carregando...</td></tr>
              ) : services.length > 0 ? (
                services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.durationMinutes} min</td>
                    <td>
                      R$ {(service.priceCents / 100).toFixed(2).replace(".", ",")}
                    </td>
                    <td className="actions-cell">
                      <button className="action-button" onClick={() => openModal(service)}>
                        <EditarIcone />
                      </button>
                      <button className="action-button delete" onClick={() => handleDelete(service.id)}>
                        <DeletarIcone />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">Nenhum serviço cadastrado ainda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <Modal onClose={closeModal}>
          <h2>{selectedService ? "Editar Serviço" : "Adicionar Serviço"}</h2>
          <form onSubmit={handleSave} className="add-item-form">

            <div className="form-row">
              <div className="form-group">
                <label>Nome</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Duração (min)</label>
                <Input
                  name="durationMinutes"
                  type="number"
                  value={formData.durationMinutes}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preço (R$)</label>
                <Input
                  name="priceCents"
                  type="number"
                  step="0.01"
                  value={formData.priceCents}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="modal-actions">
              <Button type="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>

          </form>
        </Modal>
      )}
    </div>
  );
}
