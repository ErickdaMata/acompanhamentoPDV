// exporta como middleware para app
module.exports = app => {
    // implementada como Async para garantir reposta
    const buscarRelatorios = async (req, res) => {
        
        // A resposta sera passada para proxima chamada
        const resposta = await app.db.getRelatorios(req.body.id)
        
        // Verifica se há relatórios a enviar, pois 
        // será NULL se não houver relatórios a exibir
        if(resposta) {
            // Enviada via resposta HTTP
            res.send(resposta)
        }
        else {
            res.status(204).send('')
        }
        
    } 

    //Exporta a funcao
    return {buscarRelatorios}
}
