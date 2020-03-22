const eventoLoginCarregou = new Event('loginCarregou')
const eventoRelatorioCarregou = new Event('relatorioCarregou')

document.addEventListener('loginCarregou', scriptLogin)
document.addEventListener('relatorioCarregou', scriptRelatorio)

document.addEventListener("DOMContentLoaded", () =>{
    construirHTML('/nav/login.html', eventoLoginCarregou)
})

function construirHTML(url, evento) {
    console.log(evento)
    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            document.querySelector('body').innerHTML = html
        })
        .then(() => {            
            document.dispatchEvent(evento)
        })
        .catch(e => console.log(e))
}

function scriptLogin() {
    const formLogin = document.formLogin
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
                    alert("Usuário OK")
                    construirHTML('/nav/relatorio.html', eventoRelatorioCarregou)
                    document.addEventListener('relatorioCarregou', () => {
                        exibirRelatorio(sessao.cliente)
                    })
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

function scriptRelatorio() {
    document.getElementById('icone-sair').addEventListener('click', logout)
}

function logout(){
    alert("sai")
}

function exibirRelatorio(cliente){
    const campoRelatorio = document.getElementById('relatorio')
    campoRelatorio.innerHTML = cliente.relatorio
    /* cliente.sincronizacao
    cliente.total */
}

