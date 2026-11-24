/**
 * SGPD - Sistema de Gestão de Processos Digitais
 * Módulo JavaScript Global (Shared App State, Notifications, Catalog & Navigation)
 */

const SGPD = (function () {
    const STORAGE_KEY_PROCESSOS = 'sgpd_processos_v3';
    const STORAGE_KEY_USER = 'sgpd_current_user_v3';
    const STORAGE_KEY_NOTIF = 'sgpd_notificacoes_v3';

    // Usuários cadastrados no sistema
    const USUARIOS = {
        servidor: {
            nome: 'Antony Thiago B. da Silva',
            matricula: '50463357',
            perfil: 'servidor',
            cargo: 'Analista em Tecnologia da Informação',
            lotacao: 'DTI / PROPLAN',
            iniciais: 'AT'
        },
        rh: {
            nome: 'Dra. Mariana Costa Rangel',
            matricula: '2098412',
            perfil: 'rh',
            cargo: 'Especialista em Gestão de Pessoas',
            lotacao: 'DGP / CGBEN',
            iniciais: 'MC'
        },
        gestor: {
            nome: 'Dr. Carlos Drummond',
            matricula: '1049921',
            perfil: 'gestor',
            cargo: 'Diretor de Gestão Estratégica',
            lotacao: 'DTI / PROPLAN',
            iniciais: 'CD'
        }
    };

    // Catálogo de Benefícios e Normativos
    const BENEFICIOS_CATALOGO = [
        {
            id: 'Auxílio-Transporte',
            titulo: 'Auxílio-Transporte',
            icone: 'fa-bus',
            cor: 'blue',
            baseLegal: 'Instrução Normativa nº 28/2020 e MP nº 2.165-36/2001',
            prazoSla: '5 dias úteis',
            resumo: 'Indenização pecuniária destinada ao custeio parcial de despesas com transporte coletivo municipal, intermunicipal ou interestadual no deslocamento residência-trabalho.',
            requisitos: [
                'Comprovante de residência atualizado (máx. 90 dias)',
                'Declaração de itinerário e linhas utilizadas',
                'Informação do regime de comparecimento presencial (Integral ou PGD)'
            ]
        },
        {
            id: 'Adicional de Qualificação',
            titulo: 'Adicional de Qualificação',
            icone: 'fa-graduation-cap',
            cor: 'indigo',
            baseLegal: 'Lei nº 8.112/1990 e Plano de Carreiras (PGPE)',
            prazoSla: '10 dias úteis',
            resumo: 'Retribuição concedida ao servidor titular de diploma ou certificado de pós-graduação (Lato Sensu +25%, Mestrado +52% ou Doutorado +75%) em área correlata.',
            requisitos: [
                'Diploma ou Certificado de Conclusão frente e verso',
                'Histórico Escolar oficial emitido pela IES reconhecida pelo MEC',
                'Correlação temática com as atribuições do cargo efetivo'
            ]
        },
        {
            id: 'Licença Capacitação',
            titulo: 'Licença Capacitação',
            icone: 'fa-book-open-reader',
            cor: 'amber',
            baseLegal: 'Art. 87 da Lei nº 8.112/1990 e Decreto nº 9.991/2019',
            prazoSla: '15 dias úteis',
            resumo: 'Afastamento remunerado por até 90 dias após cada quinquênio de efetivo exercício para participação em ação de desenvolvimento profissional.',
            requisitos: [
                'Comprovante de matrícula com carga horária (mínimo 30h/mês)',
                'Conteúdo programático da ação de desenvolvimento',
                'Anuência expressa da Chefia Imediata (homologação no sistema)'
            ]
        },
        {
            id: 'Auxílio-Alimentação',
            titulo: 'Auxílio-Alimentação',
            icone: 'fa-utensils',
            cor: 'emerald',
            baseLegal: 'Art. 22 da Lei nº 8.460/1992 e Decreto nº 3.887/2001',
            prazoSla: '3 dias úteis',
            resumo: 'Benefício mensal de caráter indenizatório pago em pecúnia na folha de pagamento para custeio das despesas com alimentação em dias trabalhados.',
            requisitos: [
                'Termo de posse ou exercício regular no órgão',
                'Declaração de não acumulação em outro vínculo público'
            ]
        },
        {
            id: 'Auxílio-Natalidade / Creche',
            titulo: 'Auxílio-Natalidade / Creche',
            icone: 'fa-baby-carriage',
            cor: 'rose',
            baseLegal: 'Art. 196 da Lei nº 8.112/1990 e Decreto nº 977/1993',
            prazoSla: '5 dias úteis',
            resumo: 'Assistência pré-escolar para dependentes de até 5 anos e 11 meses, ou benefício único por nascimento/adoção de filho.',
            requisitos: [
                'Certidão de Nascimento ou Termo de Adoção/Guarda',
                'CPF do dependente cadastrado no SIAPE',
                'Declaração de não recebimento pelo cônjuge em outro órgão'
            ]
        }
    ];

    // Dados de exemplo iniciais (Semente)
    const DADOS_INICIAIS = [
        {
            id: 1,
            protocolo: 'SGPD-2026-0014',
            servidor: 'Antony Thiago B. da Silva',
            matricula: '50463357',
            lotacao: 'DTI / PROPLAN',
            beneficio: 'Adicional de Qualificação',
            data: '22/11/2026',
            dataAtualizacao: '22/11/2026 14:10',
            status: 'Em Análise',
            prioridade: 'Normal',
            anuenciaChefia: true,
            justificativa: 'Requeiro a concessão do adicional de qualificação correspondente ao título de Especialização em Arquitetura de Software e Governo Digital, com conclusão devidamente comprovada mediante diploma anexo.',
            detalhes: {
                titulacao: 'Especialização Lato Sensu (25%)',
                curso: 'Arquitetura de Software e Governo Digital',
                instituicao: 'Universidade Federal de Tecnologia (UFT)',
                conclusao: '15/10/2026'
            },
            docs: [
                { nome: 'diploma_especializacao_si.pdf', tamanho: '2.4 MB', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
                { nome: 'historico_escolar_oficial.pdf', tamanho: '1.1 MB', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' }
            ],
            timeline: [
                { data: '22/11/2026 14:10', autor: 'Dra. Mariana Costa (RH)', acao: 'Análise Preliminar', descricao: 'Documentação recebida e em conferência de conformidade no e-MEC.' },
                { data: '22/11/2026 10:15', autor: 'Sistema SGPD', acao: 'Distribuição Automática', descricao: 'Processo distribuído para a Divisão de Gestão de Pessoas (DGP/CGBEN).' },
                { data: '22/11/2026 09:30', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Processo digital autuado com sucesso no SGPD.' }
            ],
            parecerRH: null
        },
        {
            id: 2,
            protocolo: 'SGPD-2026-0009',
            servidor: 'Antony Thiago B. da Silva',
            matricula: '50463357',
            lotacao: 'DTI / PROPLAN',
            beneficio: 'Auxílio-Transporte',
            data: '15/11/2026',
            dataAtualizacao: '17/11/2026 16:45',
            status: 'Aprovado',
            prioridade: 'Normal',
            anuenciaChefia: true,
            justificativa: 'Solicitação de concessão de auxílio-transporte municipal devido a mudança de endereço residencial para o setor Asa Norte.',
            detalhes: {
                residencia: 'Asa Norte - SQN 412, Bloco K',
                modalidade: 'Metrô DF + Linha Circular Esplanada',
                valorDiario: 'R$ 11,00'
            },
            docs: [
                { nome: 'comprovante_residencia_nov2026.pdf', tamanho: '850 KB', hash: 'c511a3b7c8df0c17373fef4582f643e26fbfe8a4369a473a21a97fa060935be0' }
            ],
            timeline: [
                { data: '17/11/2026 16:45', autor: 'Dra. Mariana Costa (RH)', acao: 'Despacho Deferitório', descricao: 'Benefício deferido nos termos da Instrução Normativa nº 28/2020. Encaminhado à Folha de Pagamento.' },
                { data: '16/11/2026 11:00', autor: 'Dra. Mariana Costa (RH)', acao: 'Conferência de Endereço', descricao: 'Comprovante conferido em consonância com os dados cadastrais.' },
                { data: '15/11/2026 08:20', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Requerimento submetido pelo servidor.' }
            ],
            parecerRH: 'DEFERIDO. O servidor atende integralmente aos requisitos normativos para percepção do auxílio-transporte. Encaminhado ao setor financeiro para inclusão na folha de pagamento.'
        },
        {
            id: 3,
            protocolo: 'SGPD-2026-0004',
            servidor: 'Antony Thiago B. da Silva',
            matricula: '50463357',
            lotacao: 'DTI / PROPLAN',
            beneficio: 'Licença Capacitação',
            data: '05/11/2026',
            dataAtualizacao: '08/11/2026 11:20',
            status: 'Em Diligência',
            prioridade: 'Urgente',
            anuenciaChefia: false,
            justificativa: 'Requeiro afastamento de 30 dias para realização do curso presencial em Gestão Estratégica de Dados Governamentais na ENAP.',
            detalhes: {
                curso: 'Gestão Estratégica de Dados Governamentais',
                instituicao: 'Escola Nacional de Administração Pública (ENAP)',
                cargaHoraria: '60 horas',
                periodo: '01/12/2026 a 30/12/2026'
            },
            docs: [
                { nome: 'declaracao_matricula_enap.pdf', tamanho: '1.4 MB', hash: '7b52009b64fd0a2a49e6d8a939753077792b0554dad5153b0e35f35df2a7e7c3' }
            ],
            timeline: [
                { data: '08/11/2026 11:20', autor: 'Dra. Mariana Costa (RH)', acao: 'Diligência Solicitada', descricao: 'Ausência do Plano de Trabalho Individual com anuência explícita da Chefia Imediata.' },
                { data: '05/11/2026 14:00', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Requerimento de Licença Capacitação protocolado.' }
            ],
            parecerRH: 'EM DILIGÊNCIA: O servidor deve apresentar o formulário de correlação entre as atribuições do cargo e o conteúdo programático do curso, assinado ou homologado pela Chefia Imediata (Art. 87 da Lei 8.112/90).'
        }
    ];

    const NOTIFICACOES_INICIAIS = [
        {
            id: 101,
            processoId: 3,
            titulo: 'Diligência no processo SGPD-2026-0004',
            texto: 'O RH solicitou anuência da chefia para a Licença Capacitação.',
            data: '08/11/2026',
            lida: false
        },
        {
            id: 102,
            processoId: 2,
            titulo: 'Auxílio-Transporte Deferido!',
            texto: 'Seu processo SGPD-2026-0009 foi aprovado e enviado à folha.',
            data: '17/11/2026',
            lida: false
        }
    ];

    // --- Processos (LocalStorage) ---
    function getProcessos() {
        const data = localStorage.getItem(STORAGE_KEY_PROCESSOS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(DADOS_INICIAIS));
            return JSON.parse(JSON.stringify(DADOS_INICIAIS));
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return JSON.parse(JSON.stringify(DADOS_INICIAIS));
        }
    }

    function getProcessoPorId(id) {
        return getProcessos().find(p => String(p.id) === String(id));
    }

    function salvarProcesso(processoAtualizado) {
        const lista = getProcessos();
        const index = lista.findIndex(p => String(p.id) === String(processoAtualizado.id));
        if (index >= 0) {
            lista[index] = processoAtualizado;
        } else {
            lista.unshift(processoAtualizado);
        }
        localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(lista));
    }

    function criarProcesso(dados) {
        const lista = getProcessos();
        const ano = new Date().getFullYear();
        const rand = Math.floor(1000 + Math.random() * 9000);
        const nup = `SGPD-${ano}-${rand}`;
        const agora = new Date();
        const dataStr = agora.toLocaleDateString('pt-BR');
        const horaStr = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        const novo = {
            id: Date.now(),
            protocolo: nup,
            servidor: dados.servidor,
            matricula: dados.matricula,
            lotacao: dados.lotacao || 'DTI / PROPLAN',
            beneficio: dados.beneficio,
            data: dataStr,
            dataAtualizacao: `${dataStr} ${horaStr}`,
            status: 'Em Análise',
            prioridade: dados.prioridade || 'Normal',
            anuenciaChefia: dados.beneficio !== 'Licença Capacitação',
            justificativa: dados.justificativa,
            detalhes: dados.detalhes || {},
            docs: dados.docs || [],
            timeline: [
                { data: `${dataStr} ${horaStr}`, autor: 'Sistema SGPD', acao: 'Distribuição Automática', descricao: 'Processo distribuído para fila de análise da Gestão de Pessoas (RH).' },
                { data: `${dataStr} ${horaStr}`, autor: dados.servidor, acao: 'Autuação do Processo', descricao: `Processo de ${dados.beneficio} autuado digitalmente.` }
            ],
            parecerRH: null
        };

        lista.unshift(novo);
        localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(lista));

        addNotificacao({
            processoId: novo.id,
            titulo: `Novo Processo: ${nup}`,
            texto: `${dados.servidor} protocolou pedido de ${dados.beneficio}.`,
            data: dataStr
        });

        return novo;
    }

    function despacharProcesso(id, novoStatus, parecer) {
        const p = getProcessoPorId(id);
        if (!p) return null;

        const u = getUsuario();
        const agora = new Date();
        const dataStr = agora.toLocaleDateString('pt-BR');
        const horaStr = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        p.status = novoStatus;
        p.dataAtualizacao = `${dataStr} ${horaStr}`;
        p.parecerRH = parecer;

        let rotulo = 'Despacho Deferitório';
        if (novoStatus === 'Em Diligência') rotulo = 'Exigência de Diligência';
        if (novoStatus === 'Indeferido') rotulo = 'Despacho de Indeferimento';

        p.timeline.unshift({
            data: `${dataStr} ${horaStr}`,
            autor: `${u.nome} (RH)`,
            acao: rotulo,
            descricao: parecer
        });

        salvarProcesso(p);

        addNotificacao({
            processoId: p.id,
            titulo: `Despacho no processo ${p.protocolo}`,
            texto: `Status atualizado para: ${novoStatus}.`,
            data: dataStr
        });

        return p;
    }

    function homologarProcesso(id, aprovado, observacao) {
        const p = getProcessoPorId(id);
        if (!p) return null;

        const u = getUsuario();
        const agora = new Date();
        const dataStr = agora.toLocaleDateString('pt-BR');
        const horaStr = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        p.anuenciaChefia = aprovado;
        p.dataAtualizacao = `${dataStr} ${horaStr}`;

        if (aprovado && p.status === 'Em Diligência') {
            p.status = 'Em Análise';
        } else if (!aprovado) {
            p.status = 'Em Diligência';
            p.parecerRH = `DEVOLVIDO PELA CHEFIA IMEDIATA: ${observacao}`;
        }

        p.timeline.unshift({
            data: `${dataStr} ${horaStr}`,
            autor: `${u.nome} (Chefia Imediata)`,
            acao: aprovado ? 'Anuência / Homologação Concedida' : 'Devolvido pela Chefia',
            descricao: observacao
        });

        salvarProcesso(p);

        addNotificacao({
            processoId: p.id,
            titulo: aprovado ? `Anuência concedida: ${p.protocolo}` : `Devolução da Chefia: ${p.protocolo}`,
            texto: observacao,
            data: dataStr
        });

        return p;
    }

    function togglePrioridade(id) {
        const p = getProcessoPorId(id);
        if (!p) return null;
        p.prioridade = p.prioridade === 'Urgente' ? 'Normal' : 'Urgente';
        salvarProcesso(p);
        return p;
    }

    // --- Notificações (LocalStorage) ---
    function getNotificacoes() {
        const data = localStorage.getItem(STORAGE_KEY_NOTIF);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_NOTIF, JSON.stringify(NOTIFICACOES_INICIAIS));
            return JSON.parse(JSON.stringify(NOTIFICACOES_INICIAIS));
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }

    function addNotificacao(n) {
        const lista = getNotificacoes();
        lista.unshift({
            id: Date.now(),
            processoId: n.processoId || null,
            titulo: n.titulo,
            texto: n.texto,
            data: n.data || new Date().toLocaleDateString('pt-BR'),
            lida: false
        });
        localStorage.setItem(STORAGE_KEY_NOTIF, JSON.stringify(lista.slice(0, 15)));
        renderHeaderNotificacoes();
    }

    function marcarTodasLidas() {
        const lista = getNotificacoes().map(n => ({ ...n, lida: true }));
        localStorage.setItem(STORAGE_KEY_NOTIF, JSON.stringify(lista));
        renderHeaderNotificacoes();
        toast('Todas as notificações marcadas como lidas.', 'info');
    }

    function abrirNotificacao(notifId, processoId) {
        const lista = getNotificacoes().map(n => n.id === notifId ? { ...n, lida: true } : n);
        localStorage.setItem(STORAGE_KEY_NOTIF, JSON.stringify(lista));
        if (processoId) {
            window.location.href = `processo.html?id=${processoId}`;
        } else {
            renderHeaderNotificacoes();
        }
    }

    function renderHeaderNotificacoes() {
        const container = document.getElementById('notif-container');
        if (!container) return;

        const lista = getNotificacoes();
        const naoLidas = lista.filter(n => !n.lida).length;

        container.innerHTML = `
            <div class="notif-wrapper">
                <button type="button" onclick="SGPD.toggleNotificacoes(event)" class="notif-bell-btn" title="Notificações">
                    <i class="fa-regular fa-bell text-base"></i>
                    ${naoLidas > 0 ? `<span class="notif-badge">${naoLidas}</span>` : ''}
                </button>
                <div id="notificacoes-drop" class="notif-dropdown hidden">
                    <div class="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <span class="text-[11px] font-bold uppercase text-slate-600 tracking-wider">Notificações (${naoLidas})</span>
                        ${naoLidas > 0 ? `<button type="button" onclick="SGPD.marcarTodasLidas()" class="text-[11px] text-blue-600 font-semibold hover:underline">Marcar lidas</button>` : ''}
                    </div>
                    <div class="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        ${lista.length === 0 ? `<div class="p-4 text-center text-xs text-slate-400">Sem notificações.</div>` : lista.map(n => `
                            <div onclick="SGPD.abrirNotificacao(${n.id}, ${n.processoId})" class="p-3 hover:bg-slate-50 cursor-pointer transition ${n.lida ? 'opacity-60' : 'bg-blue-50/40'}">
                                <div class="flex justify-between items-start gap-2">
                                    <span class="text-xs font-bold text-slate-800">${n.titulo}</span>
                                    <span class="text-[10px] text-slate-400 shrink-0">${n.data}</span>
                                </div>
                                <p class="text-[11px] text-slate-600 mt-0.5">${n.texto}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // --- Usuário / Sessão ---
    function getUsuario() {
        const data = localStorage.getItem(STORAGE_KEY_USER);
        if (!data) {
            const padrao = USUARIOS.servidor;
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(padrao));
            return padrao;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return USUARIOS.servidor;
        }
    }

    function setPerfil(role) {
        const u = USUARIOS[role] || USUARIOS.servidor;
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
        return u;
    }

    function alternarPerfil(role) {
        setPerfil(role);
        if (role === 'servidor') {
            window.location.href = 'servidor.html';
        } else if (role === 'gestor') {
            window.location.href = 'gestor.html';
        } else {
            window.location.href = 'rh.html';
        }
    }

    function logout() {
        localStorage.removeItem(STORAGE_KEY_USER);
        window.location.href = 'index.html';
    }

    function resetarDados() {
            if (confirm('Deseja restaurar todos os processos e notificações para os dados padrão da demonstração?')) {
                localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(DADOS_INICIAIS));
                localStorage.setItem(STORAGE_KEY_NOTIF, JSON.stringify(NOTIFICACOES_INICIAIS));
                window.location.reload();
            }
        }

        // --- UI & Helpers ---
        function toast(mensagem, tipo = 'info') {
            let box = document.getElementById('toast-box');
            if (!box) {
                box = document.createElement('div');
                box.id = 'toast-box';
                document.body.appendChild(box);
            }

            const item = document.createElement('div');
            let bg = 'bg-slate-900';
            let icon = '<i class="fa-solid fa-circle-info text-blue-400"></i>';

            if (tipo === 'sucesso') {
                bg = 'bg-emerald-700';
                icon = '<i class="fa-solid fa-circle-check text-emerald-300"></i>';
            } else if (tipo === 'alerta') {
                bg = 'bg-amber-600';
                icon = '<i class="fa-solid fa-triangle-exclamation text-amber-200"></i>';
            } else if (tipo === 'erro') {
                bg = 'bg-rose-700';
                icon = '<i class="fa-solid fa-circle-xmark text-rose-200"></i>';
            }

            item.className = `toast-msg ${bg}`;
            item.innerHTML = `
            ${icon}
            <span style="flex:1">${mensagem}</span>
            <button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;cursor:pointer;opacity:0.7">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

            box.appendChild(item);
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                setTimeout(() => item.remove(), 300);
            }, 4000);
        }

        function toggleMobileMenu() {
            const drawer = document.getElementById('mobile-drawer');
            if (drawer) drawer.classList.toggle('open');
        }

            function toggleNotificacoes(e) {
                if (e) e.stopPropagation();
                const drop = document.getElementById('notificacoes-drop');
                if (drop) drop.classList.toggle('hidden');
            }

            function getBadgeClass(status) {
                switch (status) {
                    case 'Aprovado': return 'badge-status badge-aprovado';
                    case 'Em Diligência': return 'badge-status badge-diligencia';
                    case 'Indeferido': return 'badge-status badge-indeferido';
                    default: return 'badge-status badge-analise';
                }
            }

            function getStatusIcon(status) {
                switch (status) {
                    case 'Aprovado': return '<i class="fa-solid fa-circle-check text-emerald-600"></i>';
                    case 'Em Diligência': return '<i class="fa-solid fa-triangle-exclamation text-amber-600"></i>';
                    case 'Indeferido': return '<i class="fa-solid fa-ban text-rose-600"></i>';
                    default: return '<i class="fa-solid fa-hourglass-half text-blue-600"></i>';
                }
            }

            function getSlaDias(dataBr) {
                if (!dataBr) return 0;
                const partes = dataBr.split('/');
                if (partes.length !== 3) return 0;
                const dt = new Date(Number(partes[2]), Number(partes[1]) - 1, Number(partes[0]));
                const diff = Math.floor((Date.now() - dt.getTime()) / (1000 * 60 * 60 * 24));
                return Math.max(0, diff);
            }

            // Listeners globais: fechar modais com ESC e fechar dropdown ao clicar fora
            document.addEventListener('DOMContentLoaded', () => {
                renderHeaderNotificacoes();

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
                        const drop = document.getElementById('notificacoes-drop');
                        if (drop) drop.classList.add('hidden');
                    }
                });

                document.addEventListener('click', (e) => {
                    // Fechar modal clicando no backdrop
                    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
                        e.target.classList.remove('active');
                    }
                    // Fechar dropdown de notificações clicando fora
                    const drop = document.getElementById('notificacoes-drop');
                    if (drop && !drop.classList.contains('hidden') && !e.target.closest('.notif-wrapper')) {
                        drop.classList.add('hidden');
                    }
                });
            });

            return {
                BENEFICIOS_CATALOGO,
                getProcessos,
                getProcessoPorId,
                salvarProcesso,
                criarProcesso,
                despacharProcesso,
                homologarProcesso,
                togglePrioridade,
                getNotificacoes,
                addNotificacao,
                marcarTodasLidas,
                abrirNotificacao,
                renderHeaderNotificacoes,
                getUsuario,
                setPerfil,
                alternarPerfil,
                logout,
                resetarDados,
                toast,
                toggleMobileMenu,
                toggleNotificacoes,
                getBadgeClass,
        getStatusIcon,
                getSlaDias
            };
        }) ();
