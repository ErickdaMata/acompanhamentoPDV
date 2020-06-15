//const servidor = require('serverFTP')

rel1 = `========================================

001 - PADARIA E AÇOUGUE MAGNA LTDA
        DEMONSTRATIVO DE VENDAS         

RELATORIO POR:FAIXA DE DATAS
Inicial: 01/06/20 08:30
Final: 01/06/20 14:30
========================================

            MOVIMENTO GERAL             
                         VALOR  QTD.DOCS
VENDA BRUTA             742,30        27
CANC. CUPONS              0,00         0
CANC. ITENS              19,00         1
DESC. NOS ITENS           0,00         0
TX SERVICOS             282,50
                   -----------
VENDA LIQUIDA (L)       440,80        26

TOTAL DE ATENDIMENTOS                 22
========================================

             DEMONSTRATIVO              
           -------
(+)BRUTO      0,00     0
----------------------------------------
(+)CANCELAMEN 0,00
   DEVOLUCOES 0,00
(-)DESCONTOS VALOR    PRODUTOS     MEDIA
              0,00         0
(-)TX SERVICO 0,00
           -------
(=)LIQUIDO    0,00
(-)CUSTO      0,00
----------------------------------------
(-)RESULTADO  0,00
========================================

   COMPARATIVO (FECHAMENTO X VENDAS)    

        IMPRESSO SOMENTE NO PDV         

========================================

             SALDO DE CAIXA             

        IMPRESSO SOMENTE NO PDV         

========================================

  DEMONSTRATIVO POR FORMA DE PAGAMENTO  
TIPO DE PAGAMENTO        VALOR   PARTIC%
-----------------        -----   -------
A VISTA
                       -------
TOTAL                   723,30

A PRAZO
                       -------
TOTAL                   723,30

TOTAL GERAL             723,30
========================================
    Emitido por 001 - ADMINISTRADOR     
         Em 01/06/2020 14:30:18         
==========FIM DO DEMONSTRATIVO==========
`

rel2 = `========================================

001 - FARMACIA SONHO MEU LTDA
        DEMONSTRATIVO DE VENDAS         

RELATORIO POR:FAIXA DE DATAS
Inicial: 01/06/20 08:30
Final: 01/06/20 14:30
========================================

            MOVIMENTO GERAL             
                         VALOR  QTD.DOCS
VENDA BRUTA           1.594,82       159
CANC. CUPONS              0,00         0
CANC. ITENS               0,00         0
DESC. NOS ITENS         125,11         0
TX SERVICOS             337,19
                   -----------
VENDA LIQUIDA (L)     1.132,52       159

TOTAL DE ATENDIMENTOS                 69
========================================

             DEMONSTRATIVO              
           -------
(+)BRUTO      0,00     0
----------------------------------------
(+)CANCELAMEN 0,00
   DEVOLUCOES 0,00
(-)DESCONTOS VALOR    PRODUTOS     MEDIA
              0,00         0
(-)TX SERVICO 0,00
           -------
(=)LIQUIDO    0,00
(-)CUSTO      0,00
----------------------------------------
(-)RESULTADO  0,00
========================================

   COMPARATIVO (FECHAMENTO X VENDAS)    

        IMPRESSO SOMENTE NO PDV         

========================================

             SALDO DE CAIXA             

        IMPRESSO SOMENTE NO PDV         

========================================

  DEMONSTRATIVO POR FORMA DE PAGAMENTO  
TIPO DE PAGAMENTO        VALOR   PARTIC%
-----------------        -----   -------
A VISTA
                       -------
TOTAL                 1.594,82

A PRAZO
                       -------
TOTAL                 1.594,82

TOTAL GERAL           1.594,82
========================================
    Emitido por 001 - ADMINISTRADOR     
         Em 01/06/2020 14:30:24         
==========FIM DO DEMONSTRATIVO==========
`
module.exports = app => {
    const buscarRelatorios = (req, res)=> {
        const lista = [
                {
                    nome: 'PADARIA E AÇOUGUE MAGNA LTDA',
                    rel: rel1,
                    hora: '01/06/2020 14:30:18'
                },
                {
                    nome: 'FARMACIA SONHO MEU LTDA',
                    rel: rel2,
                    hora: '01/06/2020 14:30:24'
                }
            ]
        res.send(lista)
    } 

    return {buscarRelatorios}
}

/* const fs = require('fs')
const _path = require('path')

module.exports = async function recuperarRelatorio(usuario) {
    return new Promise((resolve, reject) => {
        //usuario = 'abc'
        const caminho = _path.join(__dirname, '../') + `/relatorios/${usuario}.txt`
        
        return fs.readFile(caminho, 'utf-8', (err, conteudo) => {
            if(err) {
                reject(err)
            } else {
                resolve(conteudo)
            }
        })
    })
} */