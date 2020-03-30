const verboso = true
const _html_login = '/assets/html/login.html'
const _html_relatorio = '/assets/html/relatorio.html'

const eventoLoginCarregou = new Event('loginCarregou')
const eventoRelatorioCarregou = new Event('relatorioCarregou')

document.addEventListener('loginCarregou', scriptLogin)
document.addEventListener('relatorioCarregou', scriptRelatorio)

document.addEventListener("DOMContentLoaded", () =>{
    construirHTML(_html_login, eventoLoginCarregou)
})

function construirHTML(url, evento) {
    v("contruir:"+ url)
    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            document.querySelector('body').innerHTML = html
            v('::finalizou html::')
        })
        .then(() => {
            document.dispatchEvent(evento)
            v('disparou evento: '+ evento.type) 
        })
        .catch(e => console.error(e))
}

function scriptLogin() {
    v('iniciou script: scriptLogin')
    const formLogin = document.formLogin
    formLogin.onsubmit = async evento => {
        v('ocorreu evento "onsubmit" em formLogin')
        evento.preventDefault()
    
        const formLogin = evento.target
        const dados = new FormData(formLogin)
    
        const opcoes = {
            method: formLogin.method,
            body: new URLSearchParams(dados)
        }
    
        fetch(formLogin.action, opcoes)
            .then(resposta => {
                v(resposta.json())
                return resposta.json()})
            .then(sessao => {
                v(sessao)
                if(sessao.estado === "true") {
                    alert("Usuário OK")
                    construirHTML(_html_relatorio, eventoRelatorioCarregou)
                    document.addEventListener('relatorioCarregou', () => {
                        exibirRelatorio(sessao.cliente)
                    })
                } 
                if(sessao.estado === "!user"){
                    alert("Usuário ou senha inválidos.")
                }
            })
            .catch(erro => {
                console.error(erro)
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
    const campoAtualizacao = document.getElementById('atualizacao')
    const campoSaldo = document.getElementById('saldo')
    campoRelatorio.innerHTML = cliente.relatorio
    campoAtualizacao.innerHTML = cliente.atualizacao
    campoSaldo.innerHTML = cliente.saldo
}

function v(texto){
    if(verboso) console.log(texto)
}