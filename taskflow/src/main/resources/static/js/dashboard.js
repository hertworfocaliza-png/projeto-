// =============================================
// Dashboard - busca dados da API
// Mostra apenas as tarefas do usuário logado
// =============================================
const API = "http://localhost:8080/tarefas";

// tudo começa aqui, exatamente como era no HTML antes
document.addEventListener("DOMContentLoaded", function () {

    // mesma lógica que estava funcionando no HTML
    if (typeof renderSidebar === "function") {
        renderSidebar("dashboard");
    }

    const dataHoje = document.getElementById("dataHoje");
    if (dataHoje) {
        dataHoje.textContent = new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });
    }

    // depois carrega os dados do dashboard
    carregarDashboard();
});

function carregarDashboard() {

    // pega o id do usuário salvo no login
    const usuarioId = localStorage.getItem("usuarioId");

    // se não estiver logado, volta para login
    if (!usuarioId) {
        alert("Usuário não logado.");
        window.location.href = "login.html";
        return;
    }

    fetch(API)
        .then(res => {
            if (!res.ok) {
                throw new Error("Erro ao buscar tarefas da API.");
            }
            return res.json();
        })
        .then(lista => {

            // filtra somente tarefas do usuário logado
            const minhasTarefas = lista.filter(t =>
                t.usuario && String(t.usuario.id) === String(usuarioId)
            );

            const total = minhasTarefas.length;
            const pend = minhasTarefas.filter(t => t.status === "PENDENTE").length;
            const and = minhasTarefas.filter(t => t.status === "EM_ANDAMENTO").length;
            const conc = minhasTarefas.filter(t => t.status === "CONCLUIDA").length;

            // Métricas numéricas
            document.getElementById("total").textContent = total;
            document.getElementById("pendentes").textContent = pend;
            document.getElementById("andamento").textContent = and;
            document.getElementById("concluidas").textContent = conc;

            // Progresso por status
            const progStatus = document.getElementById("progressoStatus");
            if (progStatus) {
                const items = [
                    { label: "Pendentes", valor: pend, total, cor: "#f4a01c" },
                    { label: "Em andamento", valor: and, total, cor: "#0fb8a0" },
                    { label: "Concluídas", valor: conc, total, cor: "#27ae60" }
                ];

                progStatus.innerHTML = items.map(i => {
                    const pct = total > 0 ? Math.round((i.valor / total) * 100) : 0;
                    return `
<div class="progress-item">
<div class="progress-top">
<span class="progress-label">${i.label}</span>
<span class="progress-pct">${i.valor} · ${pct}%</span>
</div>
<div class="progress-bar">
<div class="progress-fill" style="width:0%;background:${i.cor}"
                                     data-pct="${pct}"></div>
</div>
</div>
                    `;
                }).join("");
            }

            // Progresso por prioridade
            const alta = minhasTarefas.filter(t => t.prioridade === "ALTA").length;
            const media = minhasTarefas.filter(t => t.prioridade === "MEDIA").length;
            const baixa = minhasTarefas.filter(t => t.prioridade === "BAIXA").length;

            const progPrio = document.getElementById("progressoPrioridade");
            if (progPrio) {
                const items2 = [
                    { label: "Alta", valor: alta, cor: "#e74c6e" },
                    { label: "Média", valor: media, cor: "#f4a01c" },
                    { label: "Baixa", valor: baixa, cor: "#0fb8a0" }
                ];

                progPrio.innerHTML = items2.map(i => {
                    const pct = total > 0 ? Math.round((i.valor / total) * 100) : 0;
                    return `
<div class="progress-item">
<div class="progress-top">
<span class="progress-label">Prioridade ${i.label}</span>
<span class="progress-pct">${i.valor} · ${pct}%</span>
</div>
<div class="progress-bar">
<div class="progress-fill" style="width:0%;background:${i.cor}"
                                     data-pct="${pct}"></div>
</div>
</div>
                    `;
                }).join("");
            }

            // anima barras de progresso após renderização
            setTimeout(() => {
                document.querySelectorAll(".progress-fill").forEach(el => {
                    el.style.width = el.dataset.pct + "%";
                });
            }, 120);
        })
        .catch(erro => {
            console.error("Erro no dashboard:", erro);
        });
}