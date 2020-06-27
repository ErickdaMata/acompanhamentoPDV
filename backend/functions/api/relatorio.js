module.exports = app => {
    const buscarRelatorios = async (req, res)=> {
        const resposta =  await app.db.getRelatorios(req.body.id)
        res.send(resposta)
    } 

    return {buscarRelatorios}
}
