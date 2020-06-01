const verboso = true

module.exports = app => {

    const v = texto => {
        if(verboso) console.log(texto)
    }

    return {v}
}