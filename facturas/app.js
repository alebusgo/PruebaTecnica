const express = require('express');
const controladorFacturas = require('./api/facturas/controller');
const app = express();

const port = 3100

app.use(express.json());

app.use('/facturas', controladorFacturas);

app.listen(port, function(){
    console.log("API Ejecutandose en el puerto " + port)
});