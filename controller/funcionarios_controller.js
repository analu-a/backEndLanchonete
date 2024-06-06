const message = require('../model/config')
const funcionariosDAO = require('../modulo/DAO/funcionarios')

const getListarFuncionarios = async function(){
    let funcionariosJSON = {}

    let dadosFuncionarios = await funcionariosDAO.selectAllFuncionarios()
    
    if (dadosFuncionarios) {
        if (dadosFuncionarios.length) {
            funcionariosJSON.nomeFuncionario = dadosFuncionarios
            funcionariosJSON.quantidade = dadosFuncionarios.length
            funcionariosJSON.status_code = 200

            return funcionariosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirFuncionario = async function(id){
    try {
        let idFuncionarios = id
        if (idFuncionarios == '' || idFuncionarios == undefined || isNaN(idFuncionarios)) {
            return message.ERROR_INVALID_ID
        } else {
           let validaId = await funcionariosDAO.selectByIdFuncionario(idFuncionarios)
           if (validaId == false) {
            return message.ERROR_NOT_FOUND
           } else {
            let dadosFuncionarios = await funcionariosDAO.deleteFuncionario(idFuncionarios)

            if (dadosFuncionarios) {
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

const setInserirFuncionarios = async function( funcionarios, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultfuncionarios = {}
            if (funcionarios.nomeFuncionario == '' || funcionarios.nomeFuncionario == undefined || funcionarios.nomeFuncionario.length > 250 ||
            funcionarios.senhaFuncionario == '' || funcionarios.senhaFuncionario == undefined || funcionarios.senhaFuncionario.length > 8 ||
            funcionarios.emailFuncionario == '' || funcionarios.emailFuncionario == undefined || funcionarios.emailFuncionario.length > 60 ){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novoFuncionario = await funcionariosDAO.inserirFuncionarios(funcionarios)

                if (novoFuncionario) {
                    let returnId = await funcionariosDAO.returnId()

                    resultfuncionarios.status = message.SUCESS_CREATED_ITEM.status
                    resultfuncionarios.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultfuncionarios.message = message.SUCESS_CREATED_ITEM.message
                    resultfuncionarios.funcionarios = funcionarios

                    resultfuncionarios.funcionarios.id = await returnId
                  
                    return resultfuncionarios
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

const setAtualizarFuncionario = async function(id, contentType, dadosFuncionarios){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultdadosFuncionarios = {}
        let idFuncionarios = id
    
        if (idFuncionarios == '' || idFuncionarios == undefined || isNaN(idFuncionarios)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await funcionariosDAO.selectByIdFuncionario(idFuncionarios)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
                if (dadosFuncionarios.nomeFuncionario == '' || dadosFuncionarios.nomeFuncionario == undefined || dadosFuncionarios.nomeFuncionario.length > 250 ||
            dadosFuncionarios.senhaFuncionario == '' || dadosFuncionarios.senhaFuncionario == undefined || dadosFuncionarios.senhaFuncionario.length > 8 ||
            dadosFuncionarios.emailFuncionario == '' || dadosFuncionarios.emailFuncionario == undefined || dadosFuncionarios.emailFuncionario.length > 60) {          
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novoFuncionario = await funcionariosDAO.atualizarFuncionario(dadosFuncionarios, idFuncionarios)
    
                 if (novoFuncionario) {
                    
                   resultdadosFuncionarios.status = message.SUCESS_EDITED_ITEM.status
                   resultdadosFuncionarios.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultdadosFuncionarios.message = message.SUCESS_EDITED_ITEM.message
                   resultdadosFuncionarios.funcionarios = dadosFuncionarios
            
                    return resultdadosFuncionarios
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
        setAtualizarFuncionario,
        setInserirFuncionarios,
        getListarFuncionarios,
        setExcluirFuncionario
    }