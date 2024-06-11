const message = require('../model/config')
const produtosCategoriaDAO = require('../modulo/DAO/produto_categoria')

const getListarProdutosCategorias = async() => {

    try {
        let produtoCategoriaJSON = {}
        let dadosProdutoCategoria = await produtosCategoriaDAO.selectAllProdutoCategoria()

        if(dadosProdutoCategoria){
            
            if(dadosProdutoCategoria.length > 0) {
                
                produtoCategoriaJSON.produtos_categoria = dadosProdutoCategoria
                produtoCategoriaJSON.quantidade = dadosProdutoCategoria.length
                produtoCategoriaJSON.status_code = 200
                return produtoCategoriaJSON
            
            }else{
                return message.ERROR_NOT_FOUND 
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB 
        }
      
    } catch (error) {
        message.ERROR_INTERNAL_SERVER 
    }

}


const setInserirProdutosCategorias = async function( produtosCategorias, contentType){
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultprodutosCategorias = {}

            if (produtosCategorias.categoriaId == '' || produtosCategorias.categoriaId == undefined || isNaN(produtosCategorias.categoriaId)||
            produtosCategorias.idProdutos == '' || produtosCategorias.idProdutos == undefined || isNaN(produtosCategorias.idProdutos)){
                return message.ERROR_REQUIRED_FIELDS
            } else {
                
                let novoProdutoCategoria = await produtosCategoriaDAO.inserirProdutoCategoria(produtosCategorias)

                if (novoProdutoCategoria) {
                    let returnId = await produtosCategoriaDAO.returnId()

                    resultprodutosCategorias.status = message.SUCESS_CREATED_ITEM.status
                    resultprodutosCategorias.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultprodutosCategorias.message = message.SUCESS_CREATED_ITEM.message
                    resultprodutosCategorias.produtosCategorias = produtosCategorias

                    resultprodutosCategorias.produtosCategorias.id = await returnId

                    return resultprodutosCategorias
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarProdutoCategoria = async function(id, contentType, dadosProdutoCategoria){
    try {

    if (String(contentType).toLowerCase() == 'application/json') {
        
        let resultDadosProdutosCategoria = {}
        let idProdutoCategoria = id
    
        if (idProdutoCategoria == '' || idProdutoCategoria == undefined || isNaN(idProdutoCategoria)) {
            
            return message.ERROR_INVALID_ID
        } else {
    
            let validaId = await produtosCategoriaDAO.selectByIdProdutosCategoria(idProdutoCategoria)
    
            if (validaId == false) {
                
                return message.ERROR_NOT_FOUND
            } else {
    
                if (dadosProdutoCategoria.categoriaId == '' || dadosProdutoCategoria.categoriaId == undefined || isNaN(dadosProdutoCategoria.categoriaId)||
                dadosProdutoCategoria.idProdutos == '' || dadosProdutoCategoria.idProdutos == undefined || isNaN(dadosProdutoCategoria.idProdutos) ) {
                    
                    return message.ERROR_REQUIRED_FIELDS
                } else {
    
                 let novoProdutoCategoria = await produtosCategoriaDAO.atualizarProdutoCategoria(dadosProdutoCategoria, idProdutoCategoria)
    
                 if (novoProdutoCategoria) {
                    
                   resultDadosProdutosCategoria.status = message.SUCESS_EDITED_ITEM.status
                   resultDadosProdutosCategoria.status_code = message.SUCESS_EDITED_ITEM.status_code
                   resultDadosProdutosCategoria.message = message.SUCESS_EDITED_ITEM.message
                   resultDadosProdutosCategoria.produtosCategoria = dadosProdutoCategoria
            
                    return resultDadosProdutosCategoria
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
    
const getBuscarProdutoCategoriaId = async function (id) {

 
    let idProdutoCategoria = id
    let produtosCategoriaJSON = {}

    if (idProdutoCategoria == '' || idProdutoCategoria == undefined || isNaN(idProdutoCategoria)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosProdutoCategoria = await produtosCategoriaDAO.selectByIdProdutosCategoria(idProdutoCategoria)

        if (dadosProdutoCategoria) {
            if (dadosProdutoCategoria.length) {
                produtosCategoriaJSON.produtosCategoria = dadosProdutoCategoria
                produtosCategoriaJSON.status_code = 200

                return produtosCategoriaJSON 

            } else {
                return message.ERROR_NOT_FOUND 
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB 
        }
    }


}

module.exports= {
getListarProdutosCategorias,
getBuscarProdutoCategoriaId,
setInserirProdutosCategorias,
setAtualizarProdutoCategoria
}