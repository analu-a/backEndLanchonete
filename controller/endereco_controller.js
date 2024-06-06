const enderecosModelDAO = require("../modulo/DAO/endereco.js")
const enderecosModuloConfig = require("../model/config.js")
const pegarEnderecos = async function(){
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
}
const atualizarEnderecos = async function(enderecos, idEnderecos){
  let enderecosJSON = {}
  if(idEnderecos == " " || idEnderecos == undefined || isNaN(idEnderecos)){
    return enderecosModuloConfig.ERROR_INVALID_ID
  }else{
    const enderecosPeloId = await enderecosModelDAO.atualizarEnderecos(enderecos, idEnderecos)
    if(enderecosPeloId){
      if(enderecosPeloId.length > 0){
        if(enderecos.logradouro == " " || enderecos.logradouro == undefined || enderecos.logradouro.length > 200 ||
        enderecos.numeroCasa == " " || enderecos.numeroCasa == undefined || enderecos.numeroCasa.length > 4 ||
        enderecos.bairro == " " || enderecos.bairro == undefined || enderecos.bairro.length > 20 ||
        enderecos.cidade == ' ' || enderecos.cidade == undefined || enderecos.cidade.length > 20 ||
        enderecos.cep == ' ' || enderecos.cep == undefined || enderecos.cep.length > 9){
          return enderecosModuloConfig.ERROR_REQUIRED_FIELDS}