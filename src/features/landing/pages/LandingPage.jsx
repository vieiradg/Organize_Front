import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "../../../services/supabaseClient";
import './Landing.css';

const CalendarioIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> );
const UsuariosIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> );
const DinheiroIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> );
const SinoIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.36 17.06a2 2 0 1 0 3.28 0"></path></svg> );
const GraficoIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg> );
const CelularIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> );
const EstrelaIcone = ({ preenchida }) => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={preenchida ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> );
const SetaDireitaIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg> );
const VerificarCirculoIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.5"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> );
const EmailIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg> );
const TelefoneIcone = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2h-4a2 2 0 0 1-2-2 17.86 17.86 0 0 1-2.9-2.9 17.86 17.86 0 0 1-2.9-2.9 2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2.18 19.84 19.84 0 0 0 .5 2.19 2 2 0 0 1-.22 2.22l-1.9 1.9a15.42 15.42 0 0 0 3 3l1.9-1.9a2 2 0 0 1 2.22-.22 19.84 19.84 0 0 0 2.2.5 2 2 0 0 1 2.18 2z"></path></svg> );

export default function LandingPage() {
    const [nome, setNome] = useState("");
    const [contato, setContato] = useState("");
    const [conteudoMensagem, setConteudoMensagem] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmitContato = async (e) => {
        e.preventDefault();
        setFeedback("A enviar...");

        const { error } = await supabase
            .from("contatos")
            .insert([{ nome, contato, mensagem: conteudoMensagem }]);

        if (error) {
            setFeedback("❌ Erro ao enviar: " + error.message);
        } else {
            setFeedback("✅ Mensagem enviada com sucesso!");
            setNome("");
            setContato("");
            setConteudoMensagem("");
        }
    };

  return (
    <div className="pagina-principal">
        <header className="cabecalho">
          <div className="cabecalho-container">
            <h3 className="logo">Organize</h3>
            <nav className="menu-navegacao">
              <a href="#beneficios" className="link-menu">Benefícios</a>
              <a href="#funcionalidades" className="link-menu">Funcionalidades</a>
              <a href="#depoimentos" className="link-menu">Depoimentos</a>
              <a href="#contato" className="link-menu">Contato</a>
            </nav>
            <Link to="/login" className="botao-header">
              Entrar
            </Link>
          </div>
        </header>

        <section className="secao-hero">
          <div className="sobreposicao"></div>
          <div className="conteudo-principal">
            <div className="secao-hero-grid">
              <div className="texto-hero">
                <div className="etiqueta">
                  Programa de Agendamento Profissional
                </div>
                <h1 className="titulo-principal">
                  Organize sua Agenda e{" "}
                  <span className="destaque-titulo">Transforme</span> seu Negócio
                </h1>
                <p className="subtitulo-principal">
                  Software completo para agendamentos, gestão de clientes, relatórios de desempenho e muito mais.
                </p>
                <div className="botoes-hero">
                  <Link to="/register" className="botao-primario">
                    <CalendarioIcone />
                    Teste Grátis por 7 Dias
                  </Link>
                  <a href="#funcionalidades" className="botao-secundario">
                    Saiba Mais
                    <SetaDireitaIcone />
                  </a>
                </div>
              </div>
              <div className="imagem-hero">
                <div className="container-imagem">
                  <img
                      src="/dashboard.png"
                      alt="Interface do Organize"
                      className="imagem-dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="secao-beneficios" id="beneficios">
          <div className="conteudo-principal">
            <div className="texto-central">
              <h2 className="titulo-secao">
                Por que escolher o Organize?
              </h2>
              <p className="subtitulo-secao">
                Descubra como nosso software pode otimizar a rotina de qualquer profissional liberal
              </p>
            </div>
            <div className="grid-cards">
              <div className="card card-teal">
                <div className="card-conteudo">
                  <div className="icone-circulo icone-teal"><CalendarioIcone /></div>
                  <h3 className="titulo-card">Agendamento Inteligente</h3>
                  <p className="texto-card">Os seus clientes podem agendar serviços 24/7 através de uma interface intuitiva</p>
                </div>
              </div>
              <div className="card card-purple">
                <div className="card-conteudo">
                  <div className="icone-circulo icone-purple"><UsuariosIcone /></div>
                  <h3 className="titulo-card">Gestão Completa de Clientes</h3>
                  <p className="texto-card">Histórico completo, preferências e dados de contacto num só lugar</p>
                </div>
              </div>
              <div className="card card-emerald">
                <div className="card-conteudo">
                  <div className="icone-circulo icone-emerald"><DinheiroIcone /></div>
                  <h3 className="titulo-card">Controlo Financeiro Simples</h3>
                  <p className="texto-card">Acompanhe receitas, despesas e lucros com relatórios detalhados</p>
                </div>
              </div>
              <div className="card card-blue">
                <div className="card-conteudo">
                  <div className="icone-circulo icone-blue"><SinoIcone /></div>
                  <h3 className="titulo-card">Comunicação Eficaz</h3>
                  <p className="texto-card">Reduza as faltas com notificações automáticas por SMS e WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="secao-funcionalidades" id="funcionalidades">
          <div className="conteudo-principal">
            <div className="texto-central">
              <h2 className="titulo-secao">O que o Organize oferece?</h2>
              <p className="subtitulo-secao">
                Funcionalidades completas para otimizar todos os aspetos da sua rotina profissional
              </p>
            </div>
            <div className="grid-funcionalidades">
              <div className="lista-funcionalidades">
                <div className="item-funcionalidade">
                  <div className="icone-quadrado icone-teal"><CalendarioIcone /></div>
                  <div>
                    <h3 className="titulo-funcionalidade">Calendário Arraste e Solte</h3>
                    <p className="texto-funcionalidade">Interface visual intuitiva para gerir todos os seus agendamentos.</p>
                  </div>
                </div>
                <div className="item-funcionalidade">
                  <div className="icone-quadrado icone-purple"><UsuariosIcone /></div>
                  <div>
                    <h3 className="titulo-funcionalidade">Cadastro de Clientes</h3>
                    <p className="texto-funcionalidade">Histórico detalhado de serviços, preferências e informações de contacto.</p>
                  </div>
                </div>
                <div className="item-funcionalidade">
                  <div className="icone-quadrado icone-emerald"><GraficoIcone /></div>
                  <div>
                    <h3 className="titulo-funcionalidade">Relatórios de Desempenho</h3>
                    <p className="texto-funcionalidade">Análises detalhadas de performance, receitas e tendências do seu negócio.</p>
                  </div>
                </div>
                <div className="item-funcionalidade">
                  <div className="icone-quadrado icone-blue"><CelularIcone /></div>
                  <div>
                    <h3 className="titulo-funcionalidade">Lembretes Automáticos</h3>
                    <p className="texto-funcionalidade">Reduza as faltas com lembretes automáticos e confirmações.</p>
                  </div>
                </div>
              </div>
              <div className="imagem-funcionalidade">
                <img
                    src="/agenda.png"
                    alt="Agenda do Organize"
                    className="imagem-funcionalidade-principal"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="secao-depoimentos" id="depoimentos">
          <div className="conteudo-principal">
            <div className="texto-central">
              <h2 className="titulo-secao">O que dizem os nossos utilizadores?</h2>
              <p className="subtitulo-secao">
                Profissionais de sucesso que já transformaram os seus negócios com o Organize
              </p>
            </div>
            <div className="grid-depoimentos">
              <div className="card-depoimento">
                <div className="conteudo-card">
                  <div className="estrelas">{[...Array(5)].map((_, i) => ( <EstrelaIcone key={i} preenchida={true} /> ))}</div>
                  <p className="texto-depoimento">"O Organize revolucionou a forma como giro os meus clientes. Agora consigo focar-me no meu trabalho e o sistema trata de toda a agenda."</p>
                  <div className="perfil-depoimento">
                    <div className="iniciais-depoente icone-teal"><span>FC</span></div>
                    <div>
                      <p className="nome-depoente">Fábio Costa</p>
                      <p className="profissao-depoente">Consultor de Marketing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-depoimento">
                <div className="conteudo-card">
                  <div className="estrelas">{[...Array(5)].map((_, i) => ( <EstrelaIcone key={i} preenchida={true} /> ))}</div>
                  <p className="texto-depoimento">"Reduzi as faltas em 80% com os lembretes automáticos. A minha agenda nunca esteve tão organizada!"</p>
                  <div className="perfil-depoimento">
                    <div className="iniciais-depoente icone-purple"><span>AM</span></div>
                    <div>
                      <p className="nome-depoente">Ana Melo</p>
                      <p className="profissao-depoente">Personal Trainer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-depoimento">
                <div className="conteudo-card">
                  <div className="estrelas">{[...Array(5)].map((_, i) => ( <EstrelaIcone key={i} preenchida={true} /> ))}</div>
                  <p className="texto-depoimento">"Os relatórios ajudaram-me a entender melhor o meu negócio. Aumentei a minha faturação em 40%!"</p>
                  <div className="perfil-depoimento">
                    <div className="iniciais-depoente icone-emerald"><span>JB</span></div>
                    <div>
                      <p className="nome-depoente">João Batista</p>
                      <p className="profissao-depoente">Fisioterapeuta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="secao-contato" id="contato">
            <div className="conteudo-principal">
                <div className="texto-central">
                    <h2 className="titulo-secao">Entre em Contato</h2>
                    <p className="subtitulo-secao">
                        Tem alguma dúvida ou sugestão? Adoraríamos ouvir de você.
                    </p>
                </div>
                <div className="contato-grid">
                    <div className="info-contato">
                        <h3>Fale Conosco</h3>
                        <p>Preencha o formulário ao lado ou utilize um dos nossos canais de atendimento para falar com a nossa equipa.</p>
                        <div className="info-item">
                            <EmailIcone />
                            <span>contato@organize.com.br</span>
                        </div>
                        <div className="info-item">
                            <TelefoneIcone />
                            <span>(11) 9999-9999</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmitContato} className="formulario-contato">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Seu nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contato-form">Email ou Telefone</label>
                            <input
                                id="contato-form"
                                type="text"
                                placeholder="Seu melhor contato"
                                value={contato}
                                onChange={(e) => setContato(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mensagem">Mensagem</label>
                            <textarea
                                id="mensagem"
                                placeholder="Escreva sua mensagem aqui..."
                                value={conteudoMensagem}
                                onChange={(e) => setConteudoMensagem(e.target.value)}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="botao-form-contato">Enviar Mensagem</button>
                        {feedback && <p className="contato-feedback">{feedback}</p>}
                    </form>
                </div>
            </div>
        </section>

        <footer className="rodape">
          <div className="conteudo-principal">
            <div className="grid-rodape">
              <div className="coluna-rodape">
                <h3 className="titulo-rodape">Organize</h3>
                <p className="texto-rodape">Software de gestão completo para profissionais.</p>
              </div>
              <div className="coluna-rodape">
                <h4 className="subtitulo-rodape">Contacto</h4>
                <div className="lista-contato">
                  <div className="item-contato"><EmailIcone /><span>contato@organize.com.br</span></div>
                  <div className="item-contato"><TelefoneIcone /><span>(11) 9999-9999</span></div>
                </div>
              </div>
              <div className="coluna-rodape">
                <h4 className="subtitulo-rodape">Links Úteis</h4>
                <div className="lista-links">
                  <p className="link-rodape">Termos de Uso</p>
                  <p className="link-rodape">Política de Privacidade</p>
                </div>
              </div>
            </div>
            <div className="direitos-autorais">
              <p>&copy; 2025 Organize. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}