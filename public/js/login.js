const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");
const btnLogin = document.getElementById("btnLogin");
const mensagem = document.getElementById("mensagem");

btnLogin.addEventListener('click', async () => {
    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();

    if (!usuario || !senha) {
        mensagem.textContent = 'Preencha com usuário e senha';
        mensagem.style.color = 'red';
        return;
    }

    try {
        const url = `http://localhost:3000/login?usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`;
        const response = await fetch(url, { method: 'GET' });

        const data = await response.json();

        if (response.ok) {
            mensagem.textContent = data.message;
            mensagem.style.color = 'green';
        } else {
            mensagem.textContent = data.message;
            mensagem.style.color = 'red';
        }
    } catch (err) {
        console.log('Ocorreu um erro:', err);
        mensagem.textContent = 'Erro de conexão com o servidor';
        mensagem.style.color = 'red';
    }
});
