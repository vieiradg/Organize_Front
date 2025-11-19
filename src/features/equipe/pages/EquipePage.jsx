import React, { useState, useEffect } from "react";
import api from "../../../services/api.js";
import {
  Button,
  Card,
  Container,
  ErrorMsg,
  Form,
  FormRow,
  Input,
  ModalActions,
  ModalContent,
  ModalOverlay,
  ModalTitle,
  Subtitle,
  Table,
  TableContainer,
  Title,
  IconButton,
} from "./EquipePage.styles.js";

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

export default function EquipePage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [establishmentId, setEstablishmentId] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    memberId: null,
  });

  useEffect(() => {
    const storedEstablishmentId = localStorage.getItem("establishmentId");
    const storedUserId = localStorage.getItem("userId");

    if (storedEstablishmentId && storedUserId) {
      setEstablishmentId(storedEstablishmentId);
      setUserId(storedUserId);
      fetchTeam(storedEstablishmentId);
    } else {
      setError(
        "ID do estabelecimento ou usuário não encontrado. Faça login novamente."
      );
    }
  }, []);

  const fetchTeam = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/establishments/${id}/employees`);
      setTeam(response.data);
    } catch (err) {
      setError(
        "Erro ao carregar a equipe. Verifique a conexão com a API.",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!establishmentId || !userId) {
      setError("Dados de autenticação incompletos. Faça login novamente.");
      return;
    }

    setLoading(true);
    setError(null);

    const requestBody = {
      name: formData.name,
      role: formData.role,
      userId,
      establishmentId,
    };

    try {
      if (selectedMember) {
        await api.put(
          `/api/establishments/${establishmentId}/employees/${selectedMember.id}`,
          requestBody
        );
      } else {
        await api.post(
          `/api/establishments/${establishmentId}/employees`,
          requestBody
        );
      }
      setFormData({ name: "", role: "" });
      fetchTeam(establishmentId);
      closeModal();
    } catch {
      setError("Erro ao salvar membro. Verifique os dados e as permissões.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (memberId) => {
    setConfirmModal({ open: true, memberId });
  };

  const handleDeleteConfirmed = async () => {
    const { memberId } = confirmModal;
    if (!establishmentId || !memberId) return;
    try {
      await api.delete(
        `/api/establishments/${establishmentId}/employees/${memberId}`
      );
      fetchTeam(establishmentId);
    } catch {
      setError("Falha ao deletar o membro.");
    } finally {
      setConfirmModal({ open: false, memberId: null });
    }
  };

  const openModal = (member = null) => {
    setSelectedMember(member);
    setFormData(
      member
        ? { name: member.name || "", role: member.role || "" }
        : { name: "", role: "" }
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMember(null);
    setFormData({ name: "", role: "" });
  };

  return (
    <Container>
      <Title> Equipe</Title>

      <Card>
        <Subtitle>Adicionar Novo Membro</Subtitle>
        <Form onSubmit={handleSaveMember}>
          <FormRow>
            <Input
              name="name"
              placeholder="Nome do Membro"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="role"
              placeholder="Função (ex: Cabeleireiro)"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </FormRow>
          <Button type="submit" disabled={loading}>
            {loading ? "A Adicionar..." : "Adicionar Membro"}
          </Button>
        </Form>
      </Card>

      <Card>
        <Subtitle>Membros da Equipe</Subtitle>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Carregando equipe...</td>
                </tr>
              ) : team.length > 0 ? (
                team.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.role}</td>
                    <td className="actions">
                      <IconButton onClick={() => openModal(member)}>
                        <EditarIcone />
                      </IconButton>
                      <IconButton
                        delete
                        onClick={() => confirmDelete(member.id)}
                      >
                        <DeletarIcone />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Nenhum membro na equipe ainda.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Card>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>
              {selectedMember ? "Editar Membro" : "Adicionar Membro"}
            </ModalTitle>
            <Form onSubmit={handleSaveMember}>
              <FormRow>
                <Input
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  name="role"
                  placeholder="Função"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </FormRow>
              <ModalActions>
                <Button type="button" onClick={closeModal} secondary>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </ModalActions>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}

      {confirmModal.open && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirmar Exclusão</ModalTitle>
            <p>Tem certeza de que deseja excluir este membro da equipe?</p>
            <ModalActions>
              <Button
                type="button"
                onClick={() => setConfirmModal({ open: false, memberId: null })}
                secondary
              >
                Cancelar
              </Button>
              <Button onClick={handleDeleteConfirmed}>Confirmar</Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
