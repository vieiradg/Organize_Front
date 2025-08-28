import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import "../pages/Contato.css";

export default function FaleConosco() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("contatos")
      .insert([{ nome, contato }]);

    if (error) {
      setMensagem("❌ Erro ao enviar: " + error.message);
    } else {
      setMensagem("✅ Enviado com sucesso!");
      setNome("");
      setContato("");
    }
  };

  return (
    <div className="contato-body">
      <div className="contato-container">
        <h2 className="contato-titulo">Fale Conosco</h2>
        <form onSubmit={handleSubmit} className="contato-form">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="contato-input"
            required
          />
          <input
            type="text"
            placeholder="Seu contato (email/telefone)"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="contato-input"
            required
          />
          <button type="submit" className="btn-primario">
            Enviar
          </button>
        </form>
        {mensagem && <p className="contato-mensagem">{mensagem}</p>}
      </div>
          <button
          type="button"
          className="btn-secundario"
          onClick={() => navigate(-1)}
          style={{ marginTop: "0.5rem" }}
        >
           Voltar
        </button>
    </div>
  );
}
