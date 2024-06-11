const formaPagamentoModelDAO = require("../modulo/DAO/pagamento.js")
const formaPagamentoModuloConfig = require("../model/config.js")
const pegarFormaPagamento = async function(){
  try{
    let formaPagamentoJSON = {}
  const resultadoFormasPagamento = await formaPagamentoModelDAO.pegarFormaPagamento()
  if(resultadoFormasPagamento){
    if(resultadoFormasPagamento.length > 0){
      formaPagamentoJSON.formasPagamento = resultadoFormasPagamento
      formaPagamentoJSON.quantidade = resultadoFormasPagamento.length
      formaPagamentoJSON.status = 200
      return formaPagamentoJSON
    }else{
      return formaPagamentoModuloConfig.ERROR_NOT_FOUND
    }
  }else{
    return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER_DB
  }
}catch(error){
  return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER
}
}
const atualizarFormasPagamento = async function(formasPagamento, idFormasPagamento, contentType){
  try{
    let formaPagamentoJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
    if(idFormasPagamento == " " || idFormasPagamento == undefined || isNaN(idFormasPagamento)){
      return formaPagamentoModuloConfig.ERROR_INVALID_ID
    }else{
      const formasPagamentoPeloId = await formaPagamentoModelDAO.buscarFormasPagamentoPeloId(idFormasPagamento)
      if(formasPagamentoPeloId){
        if(formasPagamentoPeloId.length > 0){
          if(formasPagamento.tipoPagamento == " " || formasPagamento.tipoPagamento == undefined || formasPagamento.tipoPagamento.length > 20 ||
          formasPagamento.bandeira == " " || formasPagamento.bandeira == undefined || formasPagamento.bandeira.length > 45 ||
          formasPagamento.statusPagamento == " " || formasPagamento.statusPagamento == undefined || formasPagamento.statusPagamento.length > 10 ||
          formasPagamento.cpf == ' ' || formasPagamento.cpf == undefined || formasPagamento.cpf.length > 14){
            return formaPagamentoModuloConfig.ERROR_REQUIRED_FIELDS}else{
                let dadosValidated = false
                if(formasPagamento.cupom !=''  || formasPagamento.cupom != null || formasPagamento.cupom == undefined){}
              let formasPagamento = await formaPagamentoModelDAO.atualizarFormasPagamento(formasPagamento, idFormasPagamento)
              if(formasPagamento){
                formaPagamentoJSON.status = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.status
                formaPagamentoJSON.status_code = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.status_code
                formaPagamentoJSON.message = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.message
                return formaPagamentoJSON
              }else{
                return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
          }
        }if(formasPagamentoPeloId == false){
          return formaPagamentoModuloConfig.ERROR_NOT_FOUND
        }
      }
    }else{
      return formaPagamentoModuloConfig.ERROR_CONTENT_TYPE
    }
  }catch(error){
    return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER
  }
}
const deletarformasPagamento = async function(idFormasPagamento){
  try{
    if(idFormasPagamento == " " || idFormasPagamento == undefined || isNaN(idFormasPagamento)){
      return formaPagamentoModuloConfig.ERROR_INVALID_ID
    }else{
      const formasPagamentoPeloId = await formaPagamentoModelDAO.buscarFormasPagamentoPeloId(idFormasPagamento)
      if(formasPagamentoPeloId){
        if(formasPagamentoPeloId.length > 0){
          const formasPagamento = await formaPagamentoModelDAO.deletarformasPagamento(idFormasPagamento)
          if(formasPagamento){
            return formaPagamentoModuloConfig.SUCESS_DELETED_ITEM
          }else{
            return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER_DB
          }
        }else{
          return formaPagamentoModuloConfig.ERROR_NOT_FOUND
        }
      }else{
        return formaPagamentoModuloConfig.ERROR_NOT_FOUND
      }
    }
  }catch(error){
    return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER
  }
}
const inserirformasPagamento = async function(formasPagamento, contentType){
  try{
    let formaPagamentoJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(formasPagamento.logradouro == " " || formasPagamento.logradouro == undefined || formasPagamento.logradouro.length > 200 ||
          formasPagamento.numeroCasa == " " || formasPagamento.numeroCasa == undefined || formasPagamento.numeroCasa.length > 4 ||
          formasPagamento.bairro == " " || formasPagamento.bairro == undefined || formasPagamento.bairro.length > 20 ||
          formasPagamento.cidade == ' ' || formasPagamento.cidade == undefined || formasPagamento.cidade.length > 20 ||
          formasPagamento.cep == ' ' || formasPagamento.cep == undefined || formasPagamento.cep.length > 9){
            return formaPagamentoModuloConfig.ERROR_REQUIRED_FIELDS}else{
              let formasPagamento = await formaPagamentoModelDAO.inserirformasPagamento(formasPagamento)
              if(formasPagamento){
                let enderecoId = await formaPagamentoModelDAO.retornarIdDoUltimoEnderecoInserido()
                formaPagamentoJSON.status = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.status
                formaPagamentoJSON.status_code = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.status_code
                formaPagamentoJSON.message = formaPagamentoModuloConfig.SUCESS_EDITED_ITEM.message
                formaPagamentoJSON.formasPagamento = formasPagamento
                formaPagamentoJSON.formasPagamento.id = enderecoId[0].idEndereco
                return formaPagamentoJSON
              }else{
                return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
          }else{
            return formaPagamentoModuloConfig.ERROR_CONTENT_TYPE
          }
  }catch(error){
    return formaPagamentoModuloConfig.ERROR_INTERNAL_SERVER
  }
}