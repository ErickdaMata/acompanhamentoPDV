// exporta como middleware para app
module.exports = app => {
    // implementada como Async para garantir reposta
    const buscarRelatorios = async (req, res) => {
        // A resposta será passada para próxima chamada
        const resposta = await app.db.getRelatorios(req.body.id)
        // Enviada via resposta HTTP
        res.send(resposta)
    } 

    //Exporta a função
    return {buscarRelatorios}
}
