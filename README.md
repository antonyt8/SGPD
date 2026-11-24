# SGPD — Sistema de Gestão de Processos Digitais

Aplicação web completa, responsiva e estruturada para **Gestão de Requerimentos e Processos Eletrônicos de Pessoal** no Setor Público (alinhada aos padrões Gov.br, SEI 4.0, SouGov e à Lei do Governo Digital 14.129/2021).

---

## 🏗️ Nova Arquitetura Modular Multi-Páginas

Para garantir **navegação real entre páginas**, histórico de navegação nativo do navegador (botões Voltar/Avançar), URLs diretas para compartilhamento/favoritos e **responsividade 100% fluida em smartphones, tablets e desktops**, o sistema foi reestruturado em páginas dedicadas:

```
prototipo-sgpd/
├── css/
│   └── style.css            # Folha de estilos principal, tokens Gov.br e regras de responsividade mobile
├── js/
│   └── app.js               # Módulo compartilhado: LocalStorage, estado global, notificações e helpers
├── index.html               # Tela de Login e Portal de Acesso Gov.br
├── servidor.html            # Painel do Servidor Requerente (Minhas Solicitações e Métricas)
├── nova-solicitacao.html    # Formulário Inteligente de Requerimento com campos dinâmicos e Drag & Drop
├── rh.html                  # Painel de Gestão de Pessoas (Fila, Analytics, Filtros e Despacho)
├── gestor.html              # Painel da Chefia Imediata (Anuência e Homologação Gerencial)
├── guia.html                # Guia de Benefícios, Base Normativa e Prazos (SLA)
├── processo.html            # Dossiê Eletrônico Completo (Histórico, Anexos, Despacho e Diligência)
├── comprovante.html         # Certidão Oficial de Autuação (Impressão e PDF)
└── README.md                # Documentação técnica e guia de uso
```

---

## 📱 Responsividade e Navegação Corrigidas

1. **Navegação Real via URL**:
   - Cada tela é um arquivo `.html` independente. Você pode usar os botões **Voltar e Avançar** do navegador ou recarregar a página (`F5`) sem perder o contexto nem ser jogado para o login.
   - Navegação direta por parâmetros (ex: `processo.html?id=1`, `comprovante.html?id=2`).

2. **Menu Mobile Adaptativo (Hambúrguer)**:
   - Em telas pequenas (`< 768px`), a barra superior exibe um botão de menu retrátil (`fa-bars`) com drawer deslizante contendo todos os links, informações do usuário logado e opção de sair.

3. **Tabelas e Cards Híbridos**:
   - Em desktops e tablets, os processos são exibidos em tabelas completas.
   - Em smartphones (`< 640px`), o sistema converte automaticamente a listagem em **cards individuais de toque**, eliminando rolagem horizontal excessiva ou cortes de tela.

4. **Formulários e Modais Otimizados para Toque**:
   - Campos de formulário com altura e espaçamento ergonômicos para dispositivos touch.
   - Modais com rolagem interna suave e fechamento ágil.

---

## 👥 Perfis de Acesso

- **Servidor Requerente**: Antony Thiago B. da Silva (*SIAPE 50463357*, TI / PROPLAN).
- **Analista de RH**: Dra. Mariana Costa Rangel (*SIAPE 2098412*, Benefícios / DGP).
- **Chefia / Gestor**: Dr. Carlos Drummond.

*O alternador rápido no topo do sistema permite trocar de perfil instantaneamente em qualquer tela.*

---

## 🔄 Fluxos Principais Testáveis

1. **Acesso**:
   - Abra [`index.html`](./index.html) e entre como **Servidor** ou **Analista RH**.
2. **Novo Requerimento**:
   - No painel do servidor, clique em **"+ Nova Solicitação"** (`nova-solicitacao.html`).
   - Alterne o tipo de benefício (Auxílio-Transporte, Adicional de Qualificação, Licença Capacitação) e veja os campos e orientações mudarem dinamicamente.
   - Anexe documentos, aceite a declaração sob as penas do Art. 299 do Código Penal e submeta.
3. **Certidão de Autuação**:
   - O sistema gera o protocolo e abre a **Certidão de Protocolo Oficial** (`comprovante.html?id=...`) com brasão e QR Code, pronta para imprimir ou salvar em PDF.
4. **Instrução e Despacho no RH**:
   - Acesse `rh.html`, localize o processo e clique em **"Despachar"**.
   - Escolha **Deferir**, **Solicitar Diligência** ou **Indeferir**, use um modelo pré-preenchido e assine eletronicamente.
5. **Cumprimento de Diligência**:
   - Ao colocar um processo em diligência, o servidor visualiza o alerta em `servidor.html`.
   - Clicando em **"Responder"**, o servidor acessa o dossiê (`processo.html`), preenche os esclarecimentos, anexa certidão complementar e envia de volta ao RH.

---

## 💾 Persistência de Dados

Todos os processos, despachos e anexos ficam salvos no `localStorage` do seu navegador. Se quiser reiniciar a demonstração com os dados de exemplo, basta clicar em **"Resetar Demonstração"** na barra superior.
