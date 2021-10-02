// Identificação dos dados salvos no Local Storage do navegador
const userKey = '__acompanhamentoPDV_user'

/* 
 * URL do backend
 * Alterar esta URL irá alterar todas as chamadas realizadas pela aplicação
 * :::: PARA DESENVOLVIMENTO USAR O ENDEREÇO LOCALHOST DO PACOTE FIREBASE ::::
 * ::::    ISTO EVITA REQUISIÇÕES EXTERNAS EM TESTES E CONSUMO DE BANDA   ::::
 * ::::     NECESSÁRIO ALTERAR TAMBÉM NO  S E R V I C E   W O R K E R     ::::
*/
// URL PARA DESENVOLVIMENTO (script 'npm run serve') 
// const baseURL = 'http://localhost:5001/i9pdvcrm/us-central1/api'

// URL PARA PRODUÇÃO
const baseURL = 'https://us-central1-i9pdvcrm.cloudfunctions.net/api'

// Exporta as constantes para uso em toda aplicação
module.exports = {baseURL, userKey}