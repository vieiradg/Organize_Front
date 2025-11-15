import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  Input,
  ModalActions,
  ModalButton,
  ModalContainer,
  ModalMessage,
  ModalOverlay,
  ModalTitle,
  Subtitle,
  Title,
} from "./establishment.style.js";

export default function EstablishmentPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [establishment, setEstablishment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedEstablishmentId = localStorage.getItem("establishmentId");
    if (storedEstablishmentId) {
      fetchEstablishment(storedEstablishmentId);
    }
  }, []);

  const fetchEstablishment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/establishments/${id}`);
      setEstablishment(response.data);
    } catch (err) {
      console.error("Erro ao buscar estabelecimento:", err);
      setError(
        "Erro ao carregar dados do estabelecimento. Verifique a conexão com a API."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const establishmentData = { name, address, phone };

    try {
      const response = await api.post("/api/establishments", establishmentData);
      localStorage.setItem("establishmentId", response.data.id);
      setSuccess(true);
      setModalInfo({
        title: "Estabelecimento criado!",
        message:
          "Seu estabelecimento foi criado com sucesso. Redirecionando...",
      });
      setIsModalOpen(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Erro ao criar estabelecimento:", err);
      setModalInfo({
        title: "Erro ao criar estabelecimento",
        message: "Verifique os dados e tente novamente.",
      });
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  if (establishment) {
    return (
      <Container>
        <Title>Meu Estabelecimento</Title>

        <Card>
          <Subtitle>Informações Gerais</Subtitle>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>Nome</InfoLabel>
              <InfoValue>{establishment.name}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Endereço</InfoLabel>
              <InfoValue>{establishment.address}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Telefone</InfoLabel>
              <InfoValue>{establishment.contactPhone}</InfoValue>
            </InfoItem>
          </InfoGrid>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Criar Estabelecimento</Title>
      <Card>
        <Subtitle>Detalhes do Estabelecimento</Subtitle>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {success && (
          <SuccessMsg>Estabelecimento criado com sucesso!</SuccessMsg>
        )}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Nome do Estabelecimento</label>
            <Input
              id="name"
              type="text"
              placeholder="Nome do seu salão, barbearia, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Endereço</label>
            <Input
              id="address"
              type="text"
              placeholder="Endereço completo"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Telefone</label>
            <Input
              id="phone"
              type="text"
              placeholder="(xx) xxxxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar Estabelecimento"}
          </Button>
        </Form>
      </Card>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>{modalInfo.title}</ModalTitle>
            <ModalMessage>{modalInfo.message}</ModalMessage>
            <ModalActions>
              <ModalButton
                $variant="confirm"
                onClick={() => setIsModalOpen(false)}
              >
                OK
              </ModalButton>
            </ModalActions>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
}
