const message = require('../model/config')
const produtosDAO = require('../modulo/DAO/produtos')

const getListarProdutos = async function(){
    let produtosJSON = {}

    let dadosProdutos = await produtosDAO.selectAllProdutos()
    
    if (dadosProdutos) {
        if (dadosProdutos.length) {
            produtosJSON.nomeProduto = dadosProdutos
            produtosJSON.quantidade = dadosProdutos.length
            produtosJSON.status_code = 200

            return produtosJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setExcluirProduto = async function(id){
    try {
        let idProduto = id
        if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {
            return message.ERROR_INVALID_ID
        } else {
           let validaId = await produtosDAO.selectByIdProdutos(idProduto)
           if (validaId == false) {
            return message.ERROR_NOT_FOUND
           } else {
            let dadosProdutos = await produtosDAO.deleteProdutos(idProduto)

            if (dadosProdutos) {
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

const setInserirProdutos = async function( produtos, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultprodutos = {}

            if (produtos.nomeProduto == '' || produtos.nomeProduto == undefined || produtos.nomeProduto.length > 20 ||
            produtos.descricaoProduto == '' || produtos.descricaoProduto == undefined || produtos.descricaoProduto.length > 100 ||
            produtos.precoProduto == '' || produtos.precoProduto == undefined || produtos.precoProduto.length > 10 || 
            produtos.fotoProduto == '' || produtos.fotoProduto == undefined || produtos.fotoProduto.length > 200){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novoProduto = await produtosDAO.inserirProdutos(produtos)

                if (novoProduto) {
                    let returnId = await produtosDAO.returnId()

                    resultprodutos.status = message.SUCESS_CREATED_ITEM.status
                    resultprodutos.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultprodutos.message = message.SUCESS_CREATED_ITEM.message
                    resultprodutos.produtos = produtos

                    resultprodutos.produtos.id = await returnId

                    return resultprodutos
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

const setAtualizarProduto = async function(id, contentType, dadosProdutos){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultDadosProdutos = {}
        let idProduto = id
    
        if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await produtosDAO.selectByIdProdutos(idProduto)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
                
                if (dadosProdutos.nomeProduto == '' || dadosProdutos.nomeProduto == undefined || dadosProdutos.nomeProduto.length > 20 ||
            dadosProdutos.descricaoProduto == '' || dadosProdutos.descricaoProduto == undefined || dadosProdutos.descricaoProduto.length > 100 ||
            dadosProdutos.precoProduto == '' || dadosProdutos.precoProduto == undefined || dadosProdutos.precoProduto.length > 10 || 
            dadosProdutos.fotoProduto == '' || dadosProdutos.fotoProduto == undefined || dadosProdutos.fotoProduto.length > 200 ) {
                    
                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novoProduto = await produtosDAO.atualizarProdutos(dadosProdutos, idProduto)
    
                 if (novoProduto) {
                    
                   resultDadosProdutos.status = message.SUCESS_EDITED_ITEM.status
                   resultDadosProdutos.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultDadosProdutos.message = message.SUCESS_EDITED_ITEM.message
                   resultDadosProdutos.produtos = dadosProdutos
            
                    return resultDadosProdutos
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

    
const getBuscarProdutoId = async function (id) {

 
    let idProduto = id
    let produtoJSON = {}

    if (idProduto == '' || idProduto == undefined || isNaN(idProduto)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosProduto = await produtosDAO.selectByIdProdutos(idProduto)

        if (dadosProduto) {
            if (dadosProduto.length) {
                produtoJSON.produtos = dadosProduto
                produtoJSON.status_code = 200

                return produtoJSON 

            } else {
                return message.ERROR_NOT_FOUND 
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB 
        }
    }


}
    
    module.exports = {
        setAtualizarProduto,
        setInserirProdutos,
        getListarProdutos,
        setExcluirProduto,
        getBuscarProdutoId
    }