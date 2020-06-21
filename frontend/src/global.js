//Identificação dos dados salvos no Local Storage do navegador
const userKey = '__acompanhamentoPDV_user'

//URL do backend, evitar localhost em desenvolvimento.
//Servidor possui módulo http-server para rede local
//const baseURL = 'https://us-central1-pdv-estagio.cloudfunctions.net/api'
const baseURL = 'http://localhost:9000'

module.exports = {baseURL, userKey}