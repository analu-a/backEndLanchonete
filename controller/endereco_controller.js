const enderecosModelDAO = require("../modulo/DAO/endereco.js")
const enderecosModuloConfig = require("../model/config.js")
const pegarEnderecos = async function(){
  let enderecosJSON = {}
  const resultadoEnderecos = await enderecosModelDAO.pegarEnderecos()
  if(resultadoEnderecos){
    if(resultadoEnderecos.lenght > 0){
      enderecosJSON.enderecos = resultadoEnderecos
      enderecosJSON.quantidade = resultadoEnderecos.lenght
      enderecosJSON.status = 200
      return enderecosJSON
    }else{
      return enderecosModuloConfig.ERROR_NOT_FOUND
    }
  }else{
    return enderecosModuloConfig.ERROR_INTERNAL_SERVER_DB
  }
}
const atualizarEnderecos = async function(enderecos, idEnderecos){
  let enderecosJSON = {}
  if(idEnderecos == " " || idEnderecos == undefined || isNaN(idEnderecos)){
    return enderecosModuloConfig.ERROR_INVALID_ID
  }else{
    const enderecosPeloId = await
  }
}