//Identificação dos dados salvos no Local Storage do navegador
const userKey = '__acompanhamentoPDV_user'

//URL do backend, evitar localhost em desenvolvimento.
//Servidor possui módulo http-server para rede local
const baseURL = 'http://192.168.0.15:9000'

module.exports = {baseURL, userKey}