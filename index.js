const Firebird = require('node-firebird');
const express = require("express")
const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))

var options = {};
 
options.host = '127.0.0.1';
options.port = 3050;
options.database = 'database.fdb';
options.user = 'SYSDBA';
options.password = 'test1234';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null;            // default
options.pageSize = 4096; 


server.get( "/", (req, res) => {

  Firebird.attach( options, ( err, db ) => {

    if (err){
      console.log( err )
      return res.send("Erro de banco de dados parte 1: " + err );
    }

    db.query( "SELECT * FROM STUDENT", ( err, result ) => {

      console.log( result )
      db.detach();
      return res.render("index.html", { result })
    })


  });
  
})

server.listen(80,'0.0.0.0', function() {
  console.log("Iniciei o servidor, porta 80")
})
