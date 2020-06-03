const serverFTP = require('basic-ftp')
const {authFTP} = require ('../.env')

exemplo()

async function exemplo(){
    const client = new serverFTP.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: authFTP.host,
            user: authFTP.user,
            password: authFTP.password
        })
        await client.downloadTo(a, authFTP.baseDir + 'val.txt', 0)
        console.log(a)
    } catch (error) {
        console.log(error)
    }
}

