const enderecosModelDAO = require("../model/DAO/endereco.js")
const enderecosModuloConfig = require("../modulo/config.js")
const pegarEnderecos = async function(){
  let enderecosJSON = {}
  const resultadoEnderecos = await enderecosModelDAO.pegarEnderecos()
  if(resultadoEnderecos){
    if(resultadoEnderecos.length > 0){
      enderecosJSON.enderecos = resultadoEnderecos
      enderecosJSON.quantidade = resultadoEnderecos.lenght
      enderecosJSON.status = 200
    }else{
      return enderecosModuloConfig.ERROR_NOT_FOUND
    }
  }else{
    return enderecosModuloConfig.ERROR_
