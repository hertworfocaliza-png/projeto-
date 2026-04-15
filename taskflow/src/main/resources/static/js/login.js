// =============================================
// Login - mantém integração com API (sem alteração)
// =============================================
const API_LOGIN = "http://localhost:8080/login"

function login() {
    const usuario = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    }

    const errorEl = document.getElementById("loginError")
    errorEl.classList.remove("visible")

    fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    })
        .then(res => res.json())
        .then(user => {
            if (user) {
                localStorage.setItem("usuarioId", user.id)
                window.location.href = "dashboard.html"
            } else {
                errorEl.classList.add("visible")
            }
        })
        .catch(() => {
            errorEl.classList.add("visible")
        })
}

// Permitir login com Enter
document.addEventListener("keydown", e => {
    if (e.key === "Enter") login()
})