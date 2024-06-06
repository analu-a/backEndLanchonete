const message = require('../model/config')
const DAOcate = require('../modulo/DAO/categorias')

const getListarCate = async function(){
    let JSONcate = {}

    let cateDados = await DAOcate.selectAllCate()
    if (cateDados) {
        if (cateDados.length) {
            JSONcate.nomeCategoria = cateDados
            JSONcate.quantidade = cateDados.length
            JSONcate.status_code = 200

            return JSONcate
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirCategoria = async function(id){
    try {
        let idCategorias = id
        if (idCategorias == '' || idCategorias == undefined || isNaN(idCategorias)) {
            return message.ERROR_INVALID_ID
        } else {
           let validaId = await DAOcate.selectByIdCategoria(idCategorias)
           if (validaId == false) {
            return message.ERROR_NOT_FOUND
           } else {
            let dadosCategorias = await DAOcate.deleteCategoria(idCategorias)

            if (dadosCategorias) {
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

const setInserirCategorias = async function( categorias, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultCategorias = {}

            if (categorias.nomeCategoria == '' || categorias.nomeCategoria == undefined || categorias.nomeCategoria.length > 45){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novaCate = await DAOcate.inserirCategorias(categorias)

                if (novaCate) {
                    let returnId = await DAOcate.returnId()

                    resultCategorias.status = message.SUCESS_CREATED_ITEM.status
                    resultCategorias.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultCategorias.message = message.SUCESS_CREATED_ITEM.message
                    resultCategorias.categorias = categorias

                    resultCategorias.categorias.id = await returnId

                    return resultCategorias
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

const setAtualizarCategoria = async function(id, contentType, dadosCategorias){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultDadosCategorias = {}
        let idCategorias = id
    
        if (idCategorias == '' || idCategorias == undefined || isNaN(idCategorias)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await DAOcate.selectByIdCategoria(idCategorias)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
    
                if (dadosCategorias.nomeCategoria == "" || dadosCategorias.nomeCategoria == undefined || dadosCategorias.nomeCategoria.length >45 ) {
                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novaCategoria = await DAOcate.atualizarCategoria(dadosCategorias, idCategorias)
    
                 if (novaCategoria) {
                    
                   resultDadosCategorias.status = message.SUCESS_EDITED_ITEM.status
                   resultDadosCategorias.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultDadosCategorias.message = message.SUCESS_EDITED_ITEM.message
                   resultDadosCategorias.categorias = dadosCategorias
            
                    return resultDadosCategorias
                 } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                
                 }
                    
                }
                
            }
            
        }
    } else{
        return message.ERROR_CONTENT_TYPE
    }
    
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
    }
    
    module.exports = {
        setAtualizarCategoria,
        setInserirCategorias,
        getListarCate,
        setExcluirCategoria
    }