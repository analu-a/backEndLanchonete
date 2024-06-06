const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const pegarEnderecos = async function(){
    try{
        let sql = `select * from endereco`
    let resultadoEnderecos = await prisma.$queryRawUnsafe(sql)
    return resultadoEnderecos
    }catch(error){
        return false
    }
}
const atualizarEnderecos = async function(enderecos, idEnderecos){
    try{
        let sql = `update endereco set logradouro = "${enderecos.logradouro}", numeroCasa = ${enderecos.numeroCasa}", bairro = "${enderecos.bairro}", cidade = "${enderecos.cidade}", cep = "${enderecos.cep}" where idEndereco = ${idEnderecos}`
        let resultadoEnderecos = await prisma.$executeRawUnsafe(sql)
        return resultadoEnderecos
    }catch(error){
        return false
    }
}
const deletarEnderecos = async function(idEnderecos){
    try{
        let sql = `delete from endereco where idEndereco = ${idEnderecos}`
        let resultadoEnderecos = await prisma.$executeRawUnsafe(sql)
        return resultadoEnderecos
    }catch(error){
        return false
    }
}
const inserirEnderecos = async function(enderecos){
    try{
        let sql = `insert into endereco(logradouro, numeroCasa, bairro, cidade, cep)values("${enderecos.logradouro}", "${enderecos.numeroCasa}", "${enderecos.bairro}", "${enderecos.cidade}", "${enderecos.cep}")`
    let resultadoEnderecos = await prisma.$executeRawUnsafe(sql)
    if(resultadoEnderecos){
        return true
    }else{
        return false
    }
}catch(error){
    return false
}
}
const buscarEnderecosPeloId = async function(idEnderecos){
    try{
        let sql = `select * from endereco where idEndereco = ${idEnderecos}`
    let resultadoEnderecos = await prisma.$queryRawUnsafe(sql)
    return resultadoEnderecos
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoEnderecoInserido = async function(){
    try{
        let sql = `select idEndereco from endereco order by idEndereco desc limit 1`
    let resultadoEnderecos = await prisma.$queryRawUnsafe(sql)
    return resultadoEnderecos
    }catch(error){
        return false
    }
}
module.exports = {
    pegarEnderecos,
    atualizarEnderecos,
    deletarEnderecos,
    inserirEnderecos,
    buscarEnderecosPeloId,
    retornarIdDoUltimoEnderecoInserido
}