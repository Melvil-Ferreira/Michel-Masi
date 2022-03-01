const mysql = require("mysql");
const Database = new mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "michael masi"
})

Database.connect(function(err) {
    if(err) throw err;

    console.log("La base de données à été connectée avec succès")
})

module.exports = Database;