document.addEventListener("DOMContentLoaded", () =>{
    navegacao('login.html')
})


function navegacao(url) {
    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            document.querySelector('body').innerHTML = html
            return document.loginForm
        })
        .then(form => eventoLogin(form))
        .catch(e => console.log(e))
    //eventoLogin()
}

function eventoLogin(formLogin) {
    formLogin.onsubmit = async evento => {
        evento.preventDefault()
    
        const formLogin = evento.target
        const dados = new FormData(formLogin)
    
        const opcoes = {
            method: formLogin.method,
            body: new URLSearchParams(dados)
        }
    
        fetch(formLogin.action, opcoes)
            .then(resposta => resposta.json())
            .then(sessao => {
                console.log(sessao)
                if(sessao.estado === "true") {
                    alert("Login validado com sucesso!")
                    //exibirRelatorio(sessao.cliente)
                } 
                if(sessao.estado === "!user"){
                    alert("Usuário ou senha inválidos.")
                }
            })
            .catch(erro => {
                console.log(erro)
            })
    }
}

function exibirRelatorio(cliente){
    cliente.relatorio 
    cliente.sincronizacao
    cliente.total
}