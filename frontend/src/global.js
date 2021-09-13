//Identificação dos dados salvos no Local Storage do navegador
const userKey = '__acompanhamentoPDV_user'

//URL do backend - script 'npm run serve' *alterar no Service Worker
//const baseURL = 'http://localhost:5001/pdv-estagio/us-central1/api'
const baseURL = 'https://us-central1-pdv-estagio.cloudfunctions.net/api'

module.exports = {baseURL, userKey}