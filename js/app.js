/**
 * SGPD - Sistema de Gestão de Processos Digitais
 * Módulo JavaScript Global (Shared App State & Navigation)
 */

const SGPD = (function () {
    const STORAGE_KEY_PROCESSOS = 'sgpd_processos_v3';
    const STORAGE_KEY_USER = 'sgpd_current_user_v3';

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
            lotacao: 'GAB / DIRETORIA',
            iniciais: 'CD'
        }
    };

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
                { data: '22/11/2026 09:30', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Processo digital autuado com sucesso no SGPD.' },
                { data: '22/11/2026 10:15', autor: 'Sistema SGPD', acao: 'Distribuição Automática', descricao: 'Processo distribuído para a Divisão de Gestão de Pessoas (DGP/CGBEN).' },
                { data: '22/11/2026 14:10', autor: 'Dra. Mariana Costa (RH)', acao: 'Análise Preliminar', descricao: 'Documentação recebida e em conferência de conformidade.' }
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
                { data: '15/11/2026 08:20', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Requerimento submetido pelo servidor.' },
                { data: '16/11/2026 11:00', autor: 'Dra. Mariana Costa (RH)', acao: 'Conferência de Endereço', descricao: 'Comprovante conferido em consonância com os dados cadastrais.' },
                { data: '17/11/2026 16:45', autor: 'Dra. Mariana Costa (RH)', acao: 'Despacho Deferitório', descricao: 'Benefício deferido nos termos da Instrução Normativa nº 28/2020. Encaminhado à Folha de Pagamento.' }
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
                { data: '05/11/2026 14:00', autor: 'Antony Thiago B. da Silva', acao: 'Autuação do Processo', descricao: 'Requerimento de Licença Capacitação protocolado.' },
                { data: '08/11/2026 11:20', autor: 'Dra. Mariana Costa (RH)', acao: 'Diligência Solicitada', descricao: 'Ausência do Plano de Trabalho Individual com anuência explícita da Chefia Imediata.' }
            ],
            parecerRH: 'EM DILIGÊNCIA: O servidor deve apresentar o formulário de correlação entre as atribuições do cargo e o conteúdo programático do curso, assinado pela Chefia Imediata (Art. 87 da Lei 8.112/90).'
        }
    ];

    // Carregar processos do LocalStorage
    function getProcessos() {
        const data = localStorage.getItem(STORAGE_KEY_PROCESSOS);
        if (!data) {
            localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(DADOS_INICIAIS));
            return DADOS_INICIAIS;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return DADOS_INICIAIS;
        }
    }

    // Obter um processo por ID
    function getProcessoPorId(id) {
        const lista = getProcessos();
        return lista.find(p => String(p.id) === String(id));
    }

    // Salvar/Atualizar Processo
    function salvarProcesso(processoAtualizado) {
        let lista = getProcessos();
        const index = lista.findIndex(p => String(p.id) === String(processoAtualizado.id));
        if (index >= 0) {
            lista[index] = processoAtualizado;
        } else {
            lista.unshift(processoAtualizado);
        }
        localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(lista));
    }

    // Criar novo processo
    function criarProcesso(dados) {
        let lista = getProcessos();
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
            prioridade: 'Normal',
            justificativa: dados.justificativa,
            detalhes: dados.detalhes || {},
            docs: dados.docs || [],
            timeline: [
                { data: `${dataStr} ${horaStr}`, autor: dados.servidor, acao: 'Autuação do Processo', descricao: `Processo de ${dados.beneficio} autuado digitalmente.` },
                { data: `${dataStr} ${horaStr}`, autor: 'Sistema SGPD', acao: 'Distribuição Automática', descricao: 'Processo distribuído para fila de análise da Gestão de Pessoas (RH).' }
            ],
            parecerRH: null
        };

        lista.unshift(novo);
        localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(lista));
        return novo;
    }

    // Obter Usuário Atual
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

    // Definir Usuário / Perfil
    function setPerfil(role) {
        const u = USUARIOS[role] || USUARIOS.servidor;
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
        return u;
    }

    // Alternar Perfil e redirecionar para a página correta
    function alternarPerfil(role) {
        const u = setPerfil(role);
        if (role === 'servidor') {
            window.location.href = 'servidor.html';
        } else {
            window.location.href = 'rh.html';
        }
    }

    // Logout
    function logout() {
        localStorage.removeItem(STORAGE_KEY_USER);
        window.location.href = 'index.html';
    }

    // Resetar Dados de Demonstração
    function resetarDados() {
        if (confirm('Deseja restaurar os processos para os dados padrão da demonstração?')) {
            localStorage.removeItem(STORAGE_KEY_PROCESSOS);
            localStorage.setItem(STORAGE_KEY_PROCESSOS, JSON.stringify(DADOS_INICIAIS));
            alert('Dados restaurados com sucesso!');
            window.location.reload();
        }
    }

    // Toast de notificação
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

    // Toggle menu mobile
    function toggleMobileMenu() {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) {
            drawer.classList.toggle('open');
        }
    }

    // Toggle dropdown de notificações
    function toggleNotificacoes() {
        const drop = document.getElementById('notificacoes-drop');
        if (drop) {
            drop.classList.toggle('hidden');
        }
    }

    // Badge styling helper
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

    return {
        getProcessos,
        getProcessoPorId,
        salvarProcesso,
        criarProcesso,
        getUsuario,
        setPerfil,
        alternarPerfil,
        logout,
        resetarDados,
        toast,
        toggleMobileMenu,
        toggleNotificacoes,
        getBadgeClass,
        getStatusIcon
    };
})();
