// exporta como middleware para app
module.exports = app => {
    // implementada como Async para garantir reposta
    const buscarRelatorios = async (req, res) => {
        // A resposta ser� passada para pr�xima chamada
        const resposta = await app.db.getRelatorios(req.body.id)
        // Enviada via resposta HTTP
        res.send(resposta)
    } 

    //Exporta a fun��o
    return {buscarRelatorios}
}
