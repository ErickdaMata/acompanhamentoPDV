/* //const JsFTP = require('jsftp')
const {authFTP} = require ('../.env')
const v = console.log

const PromiseFTP = require('promise-ftp')

const ftp = new PromiseFTP()

ftp.connect({
    host: authFTP.host,
    user: authFTP.user,
    password: authFTP.password
})
.then(function (serveMessage){
    console.log(serveMessage)
    return ftp.get(authFTP.basePath+'val.txt')
})
.then(function (stream) {
    const rl = readline.createInterface({
      input: stream
    });
    rl.on('line', function (line) {
      console.log(line)
    });
  
    stream.on("close", () => {
      ftp.end();
    });
  });
/* 
const ftpClient = require('ftp-client')

const config = {
    host: authFTP.host,
    port: 21,
    user: authFTP.user,
    password: authFTP.password
    }
const options = {
    logging: 'basic'
    }

const client = new ftpClient(config, options)
client.connect(() => {
    client.download(authFTP.basePath, '/', {
        overwrite: 'all'
    }, function (result) {
        console.log(client)
        console.log(result);
    });
}) */

/* const serverFTP = new JsFTP({
    host: authFTP.host,
    user: authFTP.user,
    port: 21,
    password: authFTP.password,
    ccreateSocket: ({port, host}, firstAction) => {
        return net.createConnection({port, host}, firstAction);
      }, // function that creates the socket, default uses net.createConnection
})

serverFTP.auth(authFTP.user, authFTP.password, (err, res) => {
    if(res.code == 230){
        serverFTP.ls(authFTP.basePath, (err, res) => {
            let files = []
            res.forEach(file => {
                files.push(file.name)
            });
            if(files.length){
                let file
                const path = authFTP.basePath + 'val.txt'
                serverFTP.get(path, files[0], err => {
                    if (hadErr) {
                      return console.error("There was an error retrieving the file.");
                    }
                    console.log("File copied successfully!");
                  });

                serverFTP.get(path, (err, socket) => {
                    console.log('entrou')
                    if (err){
                        console.log(err)
                    }
                
                    socket.on('data', data => {
                        console.log(data)
                        file += data.toString()
                    })
                
                    socket.on('close', err => {
                        if(err){
                            console.log('Erro ao recuperar arquivo:', err)
                        }
                        else{
                            console.log('finalizou')
                        }
                    socket.resume()
                    })
                })
            }
        });
    }
}) */


//ftp://ftp.lastech.com.br/lastech.com.br/web/downloads/Ric/Val/001-010-0001247/val.txt */