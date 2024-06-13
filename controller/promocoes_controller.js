const message = require('../model/config')
const promocoesDAO = require('../modulo/DAO/promocoes')

const getListarPromocoes = async function(){
    let promocoesJSON = {}

    let dadosPromocoes = await promocoesDAO.selectAllPromocoes()
    
    if (dadosPromocoes) {
        if (dadosPromocoes.length) {
            promocoesJSON.nomePromocao = dadosPromocoes
            promocoesJSON.quantidade = dadosPromocoes.length
            promocoesJSON.status_code = 200

            return promocoesJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirPromocao = async function(id){
    try {
        let idPromocao = id
        if (idPromocao == '' || idPromocao == undefined || isNaN(idPromocao)) {
            return message.ERROR_INVALID_ID
        } else {
           let validaId = await promocoesDAO.selectByIdPromocoes(idPromocao)
           if (validaId == false) {
            return message.ERROR_NOT_FOUND
           } else {
            let dadosPromocoes = await promocoesDAO.deletePromocoes(idPromocao)

            if (dadosPromocoes) {
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

const setInserirPromocoes = async function( promocoes, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultPromocoes = {}

            if (promocoes.precoPromocao == '' || promocoes.precoPromocao == undefined || promocoes.precoPromocao.length > 10 ||
            promocoes.nomePromocao == '' || promocoes.nomePromocao == undefined || promocoes.nomePromocao.length > 60 ||
            promocoes.fotoPromocional == '' || promocoes.fotoPromocional == undefined || promocoes.fotoPromocional.length > 200 ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novaPromocao = await promocoesDAO.inserirPromocoes(promocoes)

                if (novaPromocao) {
                    let returnId = await promocoesDAO.returnId()

                    resultPromocoes.status = message.SUCESS_CREATED_ITEM.status
                    resultPromocoes.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultPromocoes.message = message.SUCESS_CREATED_ITEM.message
                    resultPromocoes.promocoes = promocoes

                    resultPromocoes.promocoes.id = await returnId

                    return resultPromocoes
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

const setAtualizarPromocao = async function(id, contentType, dadosPromocoes){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultDadosPromocoes = {}
        let idPromocao = id
    
        if (idPromocao == '' || idPromocao == undefined || isNaN(idPromocao)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await promocoesDAO.selectByIdPromocoes(idPromocao)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
    
                if (dadosPromocoes.precoPromocao == '' || dadosPromocoes.precoPromocao == undefined || dadosPromocoes.precoPromocao.length > 10 ||
            dadosPromocoes.nomePromocao == '' || dadosPromocoes.nomePromocao == undefined || dadosPromocoes.nomePromocao.length > 60 ||
            dadosPromocoes.fotoPromocional == '' || dadosPromocoes.fotoPromocional == undefined || dadosPromocoes.fotoPromocional.length > 200 ) {
                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novaPromocao = await promocoesDAO.atualizarPromocoes(dadosPromocoes, idPromocao)
    
                 if (novaPromocao) {
                    
                   resultDadosPromocoes.status = message.SUCESS_EDITED_ITEM.status
                   resultDadosPromocoes.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultDadosPromocoes.message = message.SUCESS_EDITED_ITEM.message
                   resultDadosPromocoes.promocoes = dadosPromocoes
            
                    return resultDadosPromocoes
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

    const getBuscarpromocoesId = async function (id) {

 
        let idPromocoes = id
        let promocoesJSON = {}
    
        if (idPromocoes == '' || idPromocoes == undefined || isNaN(idPromocoes)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosPromocoes = await promocoesDAO.selectByIdPromocoes(idPromocoes)
    
            if (dadosPromocoes) {
                if (dadosPromocoes.length) {
                    promocoesJSON.promocoes = dadosPromocoes
                    promocoesJSON.status_code = 200
    
                    return promocoesJSON 
    
                } else {
                    return message.ERROR_NOT_FOUND 
                }
    
            } else {
                return message.ERROR_INTERNAL_SERVER_DB 
            }
        }
    
    
    }
    
    module.exports = {
        setAtualizarPromocao,
        setInserirPromocoes,
        getListarPromocoes,
        setExcluirPromocao,
        getBuscarpromocoesId
    }