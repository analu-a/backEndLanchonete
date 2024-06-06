const message = require('../model/config')
const combosDAO = require('../modulo/DAO/combos')

const getListarCombos = async function(){
    let combosJSON= {}

    let dadosCombo = await combosDAO.selectAllCombos()
    
    if (dadosCombo) {
        if (dadosCombo.length) {
            combosJSON.titulo = dadosCombo
            combosJSON.quantidade = dadosCombo.length
            combosJSON.status_code = 200

            return combosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirCombo = async function(id){
    try {
        let idCombo= id
        if (idCombo== '' || idCombo== undefined || isNaN(idCombo)) {
            return message.ERROR_INVALID_ID
        } else {
           let validaId = await combosDAO.selectByIdCombos(idCombo)
           if (validaId == false) {
            return message.ERROR_NOT_FOUND
           } else {
            let dadosCombo = await combosDAO.deleteCombos(idCombo)

            if (dadosCombo) {
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

const setInserirCombos = async function( combos, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultCombos = {}

            if (combos.titulo == '' || combos.titulo == undefined || combos.titulo.length > 50 ||
            combos.fotoCombo == '' || combos.fotoCombo == undefined || combos.fotoCombo.length > 200 ||
            combos.precoCombo == '' || combos.precoCombo == undefined || combos.precoCombo.length > 8 || 
            combos.descricaoCombo == '' || combos.descricaoCombo == undefined || combos.descricaoCombo.length > 100){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novoCombo= await combosDAO.inserirCombos(combos)

                if (novoCombo) {
                    let returnId = await combosDAO.returnId()

                    resultCombos.status = message.SUCESS_CREATED_ITEM.status
                    resultCombos.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultCombos.message = message.SUCESS_CREATED_ITEM.message
                    resultCombos.combos = combos

                    resultCombos.combos.id = await returnId

                    return resultCombos
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

const setAtualizarCombo = async function(id, contentType, dadosCombo){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultDadosCombo = {}
        let idCombo= id
    
        if (idCombo== '' || idCombo== undefined || isNaN(idCombo)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await combosDAO.selectByIdProdutos(idCombo)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
                
                if (dadosCombo.titulo == '' || dadosCombo.titulo == undefined || dadosCombo.titulo.length > 50 ||
            dadosCombo.fotoCombo == '' || dadosCombo.fotoCombo == undefined || dadosCombo.fotoCombo.length > 200 ||
            dadosCombo.precoCombo == '' || dadosCombo.precoCombo == undefined || dadosCombo.precoCombo.length > 8 || 
            dadosCombo.descricaoCombo == '' || dadosCombo.descricaoCombo == undefined || dadosCombo.descricaoCombo.length > 100 ) {
                    
                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novoCombo= await combosDAO.atualizarProdutos(dadosCombo, idCombo)
    
                 if (novoCombo) {
                    
                   resultDadosCombo.status = message.SUCESS_EDITED_ITEM.status
                   resultDadosCombo.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultDadosCombo.message = message.SUCESS_EDITED_ITEM.message
                   resultDadosCombo.combos = dadosCombo
            
                    return resultDadosCombo
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

    
const getBuscarComboId = async function (id) {

 
    let idCombo= id
    let comboJSON = {}

    if (idCombo== '' || idCombo== undefined || isNaN(idCombo)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosCombo = await combosDAO.selectByIdProdutos(idCombo)

        if (dadosCombo) {
            if (dadosCombo.length) {
                comboJSON.combos = dadosCombo
                comboJSON.status_code = 200

                return comboJSON 

            } else {
                return message.ERROR_NOT_FOUND 
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB 
        }
    }


}
    
    module.exports = {
        setAtualizarCombo,
        setInserirCombos,
        getListarCombos,
        setExcluirCombo,
        getBuscarComboId
    }