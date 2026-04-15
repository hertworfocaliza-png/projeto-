// =============================================
// Endereço da API Spring Boot
// =============================================
const API = "http://localhost:8080/tarefas";

// Guarda o filtro atual
let statusAtual = "";

// =============================================
// Inicialização da página
// =============================================
document.addEventListener("DOMContentLoaded", function () {

    // renderiza sidebar da página de tarefas
    if (typeof renderSidebar === "function") {
        renderSidebar("tarefas");
    }

    // preenche data do topo
    const dataHoje = document.getElementById("dataHoje");
    if (dataHoje) {
        dataHoje.textContent = new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });
    }

    // carrega tarefas
    listarTarefas();
});

/* ============================
   LISTAR TAREFAS (GET)
============================ */
function listarTarefas() {
    fetch(API)
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao buscar tarefas.");
            }
            return res.json();
        })
        .then(lista => {
            // Se houver login, filtra tarefas do usuário logado
            const usuarioId = localStorage.getItem("usuarioId");

            let tarefasFiltradas = lista;

            if (usuarioId) {
                tarefasFiltradas = lista.filter(tarefa =>
                    tarefa.usuario && String(tarefa.usuario.id) === String(usuarioId)
                );
            }

            // Se houver filtro por status ativo, aplica também
            if (statusAtual) {
                tarefasFiltradas = tarefasFiltradas.filter(
                    tarefa => tarefa.status === statusAtual
                );
            }

            mostrarTarefas(tarefasFiltradas);
            atualizarDashboardLocal(tarefasFiltradas);
        })
        .catch(erro => {
            console.error("Erro ao listar tarefas:", erro);
            const div = document.getElementById("listaTarefas");
            if (div) {
                div.innerHTML = `
<div class="empty-state">
<p>Erro ao carregar tarefas.</p>
</div>
                `;
            }
        });
}

/* ============================
   RENDERIZAR CARDS DE TAREFAS
============================ */
function mostrarTarefas(lista) {
    const div = document.getElementById("listaTarefas");
    div.innerHTML = "";

    if (!lista || lista.length === 0) {
        div.innerHTML = `
<div class="empty-state">
<svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
<rect x="9" y="3" width="6" height="4" rx="2"/>
</svg>
<p>Nenhuma tarefa encontrada</p>
</div>
        `;
        return;
    }

    lista.forEach(tarefa => {
        const statusLabel = {
            PENDENTE: "Pendente",
            EM_ANDAMENTO: "Em andamento",
            CONCLUIDA: "Concluída"
        }[tarefa.status] || tarefa.status;

        const prioLabel = {
            ALTA: "Alta",
            MEDIA: "Média",
            BAIXA: "Baixa"
        }[tarefa.prioridade] || tarefa.prioridade;

        div.innerHTML += `
<div class="task-card">
<div class="task-priority-bar ${tarefa.prioridade}"></div>
 
                <div class="task-body">
<div class="task-title">${tarefa.titulo}</div>
<div class="task-desc">${tarefa.descricao || "—"}</div>
 
                    <div class="task-meta">
<span class="badge badge-${tarefa.status}">${statusLabel}</span>
<span class="badge badge-${tarefa.prioridade}">${prioLabel}</span>
 
                        ${tarefa.dataEntrega ? `
<span class="task-date">
<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
<line x1="16" y1="2" x2="16" y2="6"/>
<line x1="8" y1="2" x2="8" y2="6"/>
<line x1="3" y1="10" x2="21" y2="10"/>
</svg>
                                ${tarefa.dataEntrega}
</span>
                        ` : ""}
</div>
</div>
 
                <div class="task-actions">
<button class="btn btn-edit" onclick="editar(${tarefa.id})">
                        Editar
</button>
 
                    <button class="btn btn-delete" onclick="excluir(${tarefa.id})">
                        Excluir
</button>
</div>
</div>
        `;
    });
}

/* ============================
   SALVAR OU ATUALIZAR (POST / PUT)
============================ */
function salvarTarefa() {
    const id = document.getElementById("id").value;
    const usuarioId = localStorage.getItem("usuarioId");

    const tarefa = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        dataEntrega: document.getElementById("dataEntrega").value,
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value
    };

    // Se houver login, associa a tarefa ao usuário logado
    if (usuarioId) {
        tarefa.usuario = { id: Number(usuarioId) };
    }

    // Validação simples no front
    if (!tarefa.titulo) {
        alert("Informe o título da tarefa.");
        return;
    }

    if (!tarefa.descricao) {
        alert("Informe a descrição da tarefa.");
        return;
    }

    const url = id ? `${API}/${id}` : API;
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tarefa)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao salvar a tarefa.");
            }
            return res.text().catch(() => "");
        })
        .then(() => {
            listarTarefas();
            limparFormulario();
        })
        .catch(erro => {
            console.error("Erro ao salvar tarefa:", erro);
            alert("Não foi possível salvar a tarefa.");
        });
}

/* ============================
   CARREGAR DADOS PARA EDIÇÃO
============================ */
function editar(id) {
    fetch(API)
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao buscar tarefas para edição.");
            }
            return res.json();
        })
        .then(lista => {
            const usuarioId = localStorage.getItem("usuarioId");

            let tarefasFiltradas = lista;

            // Se houver login, limita às tarefas do usuário
            if (usuarioId) {
                tarefasFiltradas = lista.filter(tarefa =>
                    tarefa.usuario && String(tarefa.usuario.id) === String(usuarioId)
                );
            }

            const tarefa = tarefasFiltradas.find(t => t.id === id);

            if (!tarefa) {
                alert("Tarefa não encontrada.");
                return;
            }

            document.getElementById("id").value = tarefa.id;
            document.getElementById("titulo").value = tarefa.titulo || "";
            document.getElementById("descricao").value = tarefa.descricao || "";
            document.getElementById("dataEntrega").value = tarefa.dataEntrega || "";
            document.getElementById("prioridade").value = tarefa.prioridade || "BAIXA";
            document.getElementById("status").value = tarefa.status || "PENDENTE";

            // mostra banner de edição, se existir no HTML
            const editingBanner = document.getElementById("editingBanner");
            const formTitleText = document.getElementById("formTitleText");

            if (editingBanner) {
                editingBanner.classList.remove("hidden");
            }

            if (formTitleText) {
                formTitleText.textContent = "Editando Tarefa";
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(erro => {
            console.error("Erro ao editar tarefa:", erro);
            alert("Não foi possível carregar a tarefa para edição.");
        });
}

/* ============================
   EXCLUIR (DELETE)
============================ */
function excluir(id) {
    if (!confirm("Confirma a exclusão desta tarefa?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao excluir tarefa.");
            }
            return res.text().catch(() => "");
        })
        .then(() => listarTarefas())
        .catch(erro => {
            console.error("Erro ao excluir tarefa:", erro);
            alert("Não foi possível excluir a tarefa.");
        });
}

/* ============================
   LIMPAR FORMULÁRIO
============================ */
function limparFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("dataEntrega").value = "";
    document.getElementById("prioridade").value = "BAIXA";
    document.getElementById("status").value = "PENDENTE";

    const editingBanner = document.getElementById("editingBanner");
    const formTitleText = document.getElementById("formTitleText");

    if (editingBanner) {
        editingBanner.classList.add("hidden");
    }

    if (formTitleText) {
        formTitleText.textContent = "Nova Tarefa";
    }
}

/* ============================
   FILTRAR POR STATUS
============================ */
function filtrar(statusRecebido) {
    // Permite usar tanto onclick="filtrar('PENDENTE')"
    // quanto onchange="filtrar()"
    if (typeof statusRecebido === "string") {
        statusAtual = statusRecebido;
    } else {
        const select = document.getElementById("filtroStatus");
        statusAtual = select ? select.value : "";
    }

    // Atualiza chips ativos, se existirem
    document.querySelectorAll(".filter-chip").forEach(chip => {
        chip.classList.toggle("active", chip.dataset.status === statusAtual);
    });

    listarTarefas();
}

/* ============================
   DASHBOARD LOCAL (opcional)
   Atualiza contadores se os elementos existirem
============================ */
function atualizarDashboardLocal(lista) {
    const total = document.getElementById("total");
    const pendentes = document.getElementById("pendentes");
    const andamento = document.getElementById("andamento");
    const concluidas = document.getElementById("concluidas");

    if (total) total.textContent = lista.length;
    if (pendentes) pendentes.textContent = lista.filter(t => t.status === "PENDENTE").length;
    if (andamento) andamento.textContent = lista.filter(t => t.status === "EM_ANDAMENTO").length;
    if (concluidas) concluidas.textContent = lista.filter(t => t.status === "CONCLUIDA").length;
}