const enderecosModelDAO = require("../modulo/DAO/endereco.js")
const enderecosModuloConfig = require("../model/config.js")
const pegarEnderecos = async function(){
  try{
    let enderecosJSON = {}
  const resultadoEnderecos = await enderecosModelDAO.pegarEnderecos()
  if(resultadoEnderecos){
    if(resultadoEnderecos.length > 0){
      enderecosJSON.enderecos = resultadoEnderecos
      enderecosJSON.quantidade = resultadoEnderecos.length
      enderecosJSON.status = 200
      return enderecosJSON
    }else{
      return enderecosModuloConfig.ERROR_NOT_FOUND
    }
  }else{
    return enderecosModuloConfig.ERROR_INTERNAL_SERVER_DB
  }
}catch(error){
  return enderecosModuloConfig.ERROR_INTERNAL_SERVER
}
}
const atualizarEnderecos = async function(enderecos, idEnderecos, contentType){
  try{
    let enderecosJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
    if(idEnderecos == " " || idEnderecos == undefined || isNaN(idEnderecos)){
      return enderecosModuloConfig.ERROR_INVALID_ID
    }else{
      const enderecosPeloId = await enderecosModelDAO.buscarEnderecosPeloId(idEnderecos)
      if(enderecosPeloId){
        if(enderecosPeloId.length > 0){
          if(enderecos.logradouro == " " || enderecos.logradouro == undefined || enderecos.logradouro.length > 200 ||
          enderecos.numeroCasa == " " || enderecos.numeroCasa == undefined || enderecos.numeroCasa.length > 4 ||
          enderecos.bairro == " " || enderecos.bairro == undefined || enderecos.bairro.length > 20 ||
          enderecos.cidade == ' ' || enderecos.cidade == undefined || enderecos.cidade.length > 20 ||
          enderecos.cep == ' ' || enderecos.cep == undefined || enderecos.cep.length > 9){
            return enderecosModuloConfig.ERROR_REQUIRED_FIELDS}else{
              let enderecos = await enderecosModelDAO.atualizarEnderecos(enderecos, idEnderecos)
              if(enderecos){
                enderecosJSON.status = enderecosModuloConfig.SUCESS_EDITED_ITEM.status
                enderecosJSON.status_code = enderecosModuloConfig.SUCESS_EDITED_ITEM.status_code
                enderecosJSON.message = enderecosModuloConfig.SUCESS_EDITED_ITEM.message
                return enderecosJSON
              }else{
                return enderecosModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
          }
        }if(enderecosPeloId == false){
          return enderecosModuloConfig.ERROR_NOT_FOUND
        }
      }
    }else{
      return enderecosModuloConfig.ERROR_CONTENT_TYPE
    }
  }catch(error){
    return enderecosModuloConfig.ERROR_INTERNAL_SERVER
  }
}
const deletarEnderecos = async function(idEnderecos){
  try{
    if(idEnderecos == " " || idEnderecos == undefined || isNaN(idEnderecos)){
      return enderecosModuloConfig.ERROR_INVALID_ID
    }else{
      const enderecosPeloId = await enderecosModelDAO.buscarEnderecosPeloId(idEnderecos)
      if(enderecosPeloId){
        if(enderecosPeloId.length > 0){
          const enderecos = await enderecosModelDAO.deletarEnderecos(idEnderecos)
          if(enderecos){
            return enderecosModuloConfig.SUCESS_DELETED_ITEM
          }else{
            return enderecosModuloConfig.ERROR_INTERNAL_SERVER_DB
          }
        }else{
          return enderecosModuloConfig.ERROR_NOT_FOUND
        }
      }else{
        return enderecosModuloConfig.ERROR_NOT_FOUND
      }
    }
  }catch(error){
    return enderecosModuloConfig.ERROR_INTERNAL_SERVER
  }
}
const inserirEnderecos = async function(enderecos, contentType){
  try{
    let enderecosJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(enderecos.logradouro == " " || enderecos.logradouro == undefined || enderecos.logradouro.length > 200 ||
          enderecos.numeroCasa == " " || enderecos.numeroCasa == undefined || enderecos.numeroCasa.length > 4 ||
          enderecos.bairro == " " || enderecos.bairro == undefined || enderecos.bairro.length > 20 ||
          enderecos.cidade == ' ' || enderecos.cidade == undefined || enderecos.cidade.length > 20 ||
          enderecos.cep == ' ' || enderecos.cep == undefined || enderecos.cep.length > 9){
            return enderecosModuloConfig.ERROR_REQUIRED_FIELDS}else{
              let enderecos = await enderecosModelDAO.inserirEnderecos(enderecos)
              if(enderecos){
                let enderecoId = await enderecosModelDAO.retornarIdDoUltimoEnderecoInserido()
                enderecosJSON.status = enderecosModuloConfig.SUCESS_EDITED_ITEM.status
                enderecosJSON.status_code = enderecosModuloConfig.SUCESS_EDITED_ITEM.status_code
                enderecosJSON.message = enderecosModuloConfig.SUCESS_EDITED_ITEM.message
                enderecosJSON.enderecos = enderecos
                enderecosJSON.enderecos.id = enderecoId[0].idEndereco
                return enderecosJSON
              }else{
                return enderecosModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
          }else{
            return enderecosModuloConfig.ERROR_CONTENT_TYPE
          }
  }catch(error){
    return enderecosModuloConfig.ERROR_INTERNAL_SERVER
  }
}
module.exports = {
  pegarEnderecos,
  atualizarEnderecos,
  deletarEnderecos,
  inserirEnderecos
}