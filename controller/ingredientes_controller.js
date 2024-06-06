const message = require('../model/config')
const ingredientesDAO = require('../modulo/DAO/ingredientes')

const getListarIngredientes = async function(){
    let ingredientesJSON = {}

    let dadosIngredientes = await ingredientesDAO.selectAllIngredientes()

    if (dadosIngredientes) {
        if (dadosIngredientes.length) {
            ingredientesJSON.ingredientes = dadosIngredientes
            ingredientesJSON.quantidade = dadosIngredientes.length
            ingredientesJSON.status_code = 200

            return ingredientesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirIngredientes = async function (id){
    try {
        
        let idIngrediente = id

        if (idIngrediente == '' || idIngrediente == undefined || isNaN(idIngrediente)) {
            return message.ERROR_INVALID_ID
        } else {
            
            let validaId = await ingredientesDAO.selectByIdIngredientes(idIngrediente)

            if (validaId == false) {
                return message.ERROR_NOT_FOUND
            } else {
                let dadosIngredientes = await ingredientesDAO.deleteIngrediente(idIngrediente)

                if (dadosIngredientes) {
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const inserirIngrediente = async function (dadosIngredientes, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosIncredientes = {}

            if (dadosIngredientes.nome_ingrediente == '' || dadosIngredientes.nome_ingrediente == undefined || dadosIngredientes.nome_ingrediente.length >20||
            dadosIngredientes.quantidade_ingredientes == '' || dadosIngredientes.quantidade_ingredientes == undefined || dadosIngredientes.quantidade_ingredientes.length >10||
            dadosIngredientes.marca_ingredientes == '' || dadosIngredientes.marca_ingredientes == undefined || dadosIngredientes.marca_ingredientes.length >45||
            dadosIngredientes.data_validade == '' || dadosIngredientes.data_validade == undefined || dadosIngredientes.data_validade.length >10||
            dadosIngredientes.foto_ingrediente == '' || dadosIngredientes.foto_ingrediente == undefined || dadosIngredientes.foto_ingrediente.length >200) 
            {

                
                return message.ERROR_REQUIRED_FIELDS
            } else {

                let novoIngrediente = await ingredientesDAO.insertIngrediente(dadosIngredientes)

                if (novoIngrediente) {
                    let returnId = await ingredientesDAO.returnId()

                    resultDadosIncredientes.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosIncredientes.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosIncredientes.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosIncredientes.ingredientes = dadosIngredientes

                    resultDadosIncredientes.ingredientes.id = await returnId

                    return resultDadosIncredientes
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarIingrediente = async function (id, contentType, dadosIngredientes){
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultDadosIncredientes = {}
            let idIngrediente = id

            if (idIngrediente == ''|| idIngrediente == undefined|| isNaN(idIngrediente)) {
                return message.ERROR_INVALID_ID
            } else {
                let validaId = await ingredientesDAO.selectByIdIngredientes(idIngrediente)

                if (validaId== false) {
                    return message.ERROR_NOT_FOUND
                } else {
                    console.log(dadosIngredientes);
                    if (dadosIngredientes.nome_ingrediente == '' || dadosIngredientes.nome_ingrediente == undefined || dadosIngredientes.nome_ingrediente.length >20||
                    dadosIngredientes.quantidade_ingredientes == '' || dadosIngredientes.quantidade_ingredientes == undefined || dadosIngredientes.quantidade_ingredientes.length >10||
                    dadosIngredientes.marca_ingredientes == '' || dadosIngredientes.marca_ingredientes == undefined || dadosIngredientes.marca_ingredientes.length >45||
                    dadosIngredientes.data_validade == '' || dadosIngredientes.data_validade == undefined || dadosIngredientes.data_validade.length >10||
                    dadosIngredientes.foto_ingrediente == '' || dadosIngredientes.foto_ingrediente == undefined || dadosIngredientes.foto_ingrediente.length >200) 
                    {
                
                        
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                      let novoIngrediente = await ingredientesDAO.updateIngrediente(dadosIngredientes, idIngrediente)

                      if (novoIngrediente) {
                        resultDadosIncredientes.status = message.SUCESS_EDITED_ITEM.status
                        resultDadosIncredientes.status_code = message.SUCESS_EDITED_ITEM.status_code
                        resultDadosIncredientes.message = message.SUCESS_EDITED_ITEM.message
                        resultDadosIncredientes.ingredientes = dadosIngredientes

                        return resultDadosIncredientes
                      } else {
                        return message.ERROR_INTERNAL_SERVER_DB
                      }
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarIngredienteId = async function (id) {

 
    let idIngrediente = id
    let ingredienteJSON = {}

    if (idIngrediente == '' || idIngrediente == undefined || isNaN(idIngrediente)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosIngrediente = await ingredientesDAO.selectByIdIngredientes(idIngrediente)

        if (dadosIngrediente) {
            if (dadosIngrediente.length) {
                ingredienteJSON.ingredientes = dadosIngrediente
                ingredienteJSON.status_code = 200

                return ingredienteJSON 

            } else {
                return message.ERROR_NOT_FOUND 
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB 
        }
    }


}

module.exports ={
    getListarIngredientes,
    setAtualizarIingrediente,
    setExcluirIngredientes,
    inserirIngrediente,
    getBuscarIngredienteId
}