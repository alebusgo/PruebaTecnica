
/**
 * Función encargada de que las facturas recibidas cumplan con los requisitos de
 * estructura para ser validadas por el servicio.
 * @param {*} facturas 
 * @returns 
 */
function valEstructura(facturas){
    let validada = true
    facturas.forEach(factura => {
        if(!("id" in factura && "nit" in factura && "descripcion" in factura && "valorTotal" in factura && "iva" in factura)){
            validada = false
        }
    });
    return validada;
}

/**
 * Función encargada de validar que el id sea un entero positivo
 * @param {*} factura 
 * @returns 
 */
function valId(factura){
    let validada = false
    let error = ""

    if(factura.id && factura.id >= 0 && Number.isInteger(factura.id)){
        validada = true 
    }
    else{
        validada = false 
        error = "Id invalido"
    }
    return {
        validada : validada,
        error : error
    }
}    

/**
 * Función encargada de validar que el nit sea un valor numérico
 * @param {*} factura 
 * @returns 
 */
function valNit(factura){
    let validada = false
    let error = ""
    
    if(factura.nit && /^[0-9]+$/g.test(factura.nit)){
        validada = true 
    }
    else{
        validada = false 
        error = "nit invalido"
    }
    return {
        validada : validada,
        error : error
    }
}

/**
 * Función encargada de validar que el valorTotal sea positivo
 * @param {} factura 
 * @returns 
 */
function valValorTotal(factura){
    let validada = false
    let error = ""
    
    if(factura.valorTotal && factura.valorTotal >= 0){
        validada = true 
    }
    else{
        validada = false 
        error = "valorTotal menor que cero"
    }
    return {
        validada : validada,
        error : error
    }
}

/**
 * Función encargada de validar que el valor del iva este dentro del rango [0-100]
 * @param {*} factura 
 * @returns 
 */
function valIva(factura){
    let validada = false
    let error = ""

    if(factura.iva && factura.iva >= 0 && factura.iva <=100){
        validada = true 
    }
    else{
        validada = false 
        error = "iva fuera de rango [0-100]"
    }
    return {
        validada : validada,
        error : error
    }    
}

/**
 * Función para generar array con los id de las facturas evitando los duplicados
 * para comparar la longitud del array con la cantidad de facturas identificando si 
 * se tiene algun id duplicado
 * @param {*} facturas 
 * @returns 
 */
function validarIdDuplicados(facturas){
    const valoresUnicos = new Set(facturas.map(factura => factura.id));
    return valoresUnicos.size === facturas.length;
}
/**
 * Función para calcular valor de iva teniendo como base el valor total de la factura
 * @param {*} factura 
 * @returns 
 */
function calcularIva(factura){
    return factura.valorTotal / (1 + factura.iva/100)
}

/**
 * Función principal encargada el llamado de las demas funciones, validar todas las facturas
 * calcular y retornar los resultados.
 * @param {*} facturas 
 * @returns 
 */
function validarFacturas(facturas){
    let resultados = {}
    const validarEstructura = valEstructura(facturas);
    if(validarEstructura){
        if(validarIdDuplicados(facturas)){
            let sumaTotales = 0
            let validadas = true 
            for(let i = 0; i < facturas.length; i++){
                let validarId = valId(facturas[i]);
                if(!validarId.validada){
                    resultados.mensaje = "Error al validar los datos en factura con id: " + facturas[i].id
                    resultados.errores = validarId.error
                    validadas = false
                    break
                }
                let validarNit = valNit(facturas[i]);
                if(!validarNit.validada){
                    resultados.mensaje = "Error al validar los datos en factura con id: " + facturas[i].id
                    resultados.errores = validarNit.error
                    validadas = false
                    break
                }
                let validarValorTotal = valValorTotal(facturas[i]);
                if(!validarValorTotal.validada){
                    resultados.mensaje = "Error al validar los datos en factura con id: " + facturas[i].id
                    resultados.errores = validarValorTotal.error
                    validadas = false
                    break
                }
                let validarIva = valIva(facturas[i]);
                if(!validarIva.validada){
                    resultados.mensaje = "Error al validar los datos en factura con id: " + facturas[i].id
                    resultados.errores = validarIva.error
                    validadas = false
                    break
                }
                sumaTotales += facturas[i].valorTotal
            }
            if(validadas){
                resultados.mensaje = "Facturas validadas correctamente"
                resultados.sumaTotales = sumaTotales;
            }
        }
        else{
            resultados.mensaje = "No pueden existir dos fácturas con el mismo id"
        }
    }
    else{
        resultados.mensaje = "Validar estructura de las facturas"
        resultados.estructura = {
            "id" :"Entero positivo",
            "nit" :"Valor Numérico",
            "descripcion" : "String",
            "valorTotal" : "Valor positivo",
            "iva" : "Valor entre 0 y 100"
        }
    }
    return resultados
}

module.exports.validarFacturas = validarFacturas;


