const express = require('express');
const controladorFacturas = express.Router();
const servicioFacturas = require('./service');


controladorFacturas.post("/validarFacturas", function(req, res){
    let facturas = req.body
    let resultado = servicioFacturas.validarFacturas(facturas);
    
    res.send(resultado)
})

module.exports = controladorFacturas;