module.exports = app => {
    const buscarRelatorios = async (req, res)=> {
        const resposta =  await app.db.getRelatorios(req.body.id)
        console.log("relatorios.js", resposta)
        res.send(resposta)
    } 

    return {buscarRelatorios}
}
