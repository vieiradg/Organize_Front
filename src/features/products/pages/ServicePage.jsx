import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";
import {
  PageContainer,
  PageHeader,
  StyledCard,
  WidgetTitulo,
  DashboardTable,
  ErrorMessage,
  ActionButton,
  DangerButton,
  PrimaryButton,
  SecondaryButton,
  ModalOverlay,
  ModalContent,
  ModalActions,
} from "../servicePage.styles.js";

const EditarIcone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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

export default function ServicePage() {
  const [establishmentId, setEstablishmentId] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    durationMinutes: "",
    priceCents: "",
  });

  useEffect(() => {
    const storedId = localStorage.getItem("establishmentId");
    if (storedId) {
      setEstablishmentId(storedId);
      fetchServices(storedId);
    } else {
      setError("ID do estabelecimento não encontrado. Faça login novamente.");
    }
  }, []);

  const fetchServices = async (id) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/establishments/${id}/services`);
      setServices(data);
    } catch (err) {
      setError("Erro ao carregar serviços.");
    } finally {
      setLoading(false);
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
    setFormData({ name: "", durationMinutes: "", priceCents: "" });
    setShowModal(false);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveService = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      description: "",
      durationMinutes: parseInt(formData.durationMinutes),
      priceCents: Math.round(
        Number(formData.priceCents.replace(",", ".")) * 100
      ),
      establishmentId,
    };

    try {
      if (selectedService) {
        await api.put(
          `/api/establishments/${establishmentId}/services/${selectedService.id}`,
          payload
        );
      } else {
        await api.post(
          `/api/establishments/${establishmentId}/services`,
          payload
        );
      }

      fetchServices(establishmentId);
      closeModal();
    } catch (err) {
      setError("Não foi possível salvar o serviço.");
    }
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/api/establishments/${establishmentId}/services/${id}`);
      fetchServices(establishmentId);
    } catch (err) {
      setError("Não foi possível apagar o serviço.");
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Gerir Serviços</h1>
        <PrimaryButton onClick={() => openModal()}>
          Adicionar Serviço
        </PrimaryButton>
      </PageHeader>

      <StyledCard>
        <WidgetTitulo>Serviços Oferecidos</WidgetTitulo>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <DashboardTable>
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
              <tr>
                <td colSpan="4">Carregando...</td>
              </tr>
            ) : services.length > 0 ? (
              services.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.duration} min</td>
                  <td>
                    R$ {(s.priceCents / 100).toFixed(2).replace(".", ",")}
                  </td>
                  <td>
                    <ActionButton onClick={() => openModal(s)}>
                      <EditarIcone />
                    </ActionButton>
                    <DangerButton onClick={() => deleteService(s.id)}>
                      <DeletarIcone />
                    </DangerButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum serviço cadastrado ainda.</td>
              </tr>
            )}
          </tbody>
        </DashboardTable>
      </StyledCard>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{selectedService ? "Editar Serviço" : "Adicionar Serviço"}</h2>

            <form onSubmit={saveService}>
              <label>Nome</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInput}
                required
              />

              <label>Duração (min)</label>
              <input
                name="durationMinutes"
                type="number"
                value={formData.durationMinutes}
                onChange={handleInput}
                required
              />

              <label>Preço (R$)</label>
              <input
                name="priceCents"
                type="text"
                value={formData.priceCents}
                onChange={handleInput}
                required
              />

              <ModalActions>
                <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </ModalActions>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}
