const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const pegarUsuarios = async function(){
    try{
        let sql = "select * from usuario"
        let resultadoUsuarios = await prisma.$queryRawUnsafe(sql)
        return resultadoUsuarios
    }catch(error){
        return false
    }
}
const atualizarUsuarios = async function(idUsuarios, usuarios){
    try{
        let sql
    if(usuarios.enderecoId == " " || usuarios.enderecoId == undefined || usuarios.enderecoId == null){
        sql = `update usuario set nomeCliente = "${usuarios.nomeCliente}", dataNascimento ="${usuarios.dataNascimento}", email = "${usuarios.email}", senha = "${usuarios.senha}", enderecoId = null, fotoUsuario = "${usuarios.fotoUsuario}" where idUser = ${idUsuarios}`
        let resultadoUsuarios = await prisma.$executeRawUnsafe(sql)
        return resultadoUsuarios
    }else{
        sql = `update usuario set nomeCliente = "${usuarios.nomeCliente}", dataNascimento ="${usuarios.dataNascimento}", email = "${usuarios.email}", senha = "${usuarios.senha}", enderecoId = ${usuarios.enderecoId}, fotoUsuario = "${usuarios.fotoUsuario}" where idUser = ${idUsuarios}`
        let resultadoUsuarios = await prisma.$executeRawUnsafe(sql)
        return resultadoUsuarios
    }
}catch(error){
    return false
}
}
const deletarUsuarios = async function(idUsuarios){
    try{
        let sql = `delete from usuario where idUser = ${idUsuarios}`
        let resultadoUsuarios = await prisma.$executeRawUnsafe(sql)
        return resultadoUsuarios
    }catch(error){
        return false
    }
}
const colocarUsuarios = async function(usuarios){
    try{
        let sql
    if(usuarios.enderecoId == '' || usuarios.enderecoId == null || usuarios.enderecoId == undefined){
        sql = `insert into usuario(nomeCliente, dataNascimento, email, senha, enderecoId, fotoUsuario)values("${usuarios.nomeCliente}", "${usuarios.dataNascimento}", "${usuarios.email}", "${usuarios.senha}", null, "${usuarios.fotoUsuario}")`
        let resultadoUsuarios = await prisma.$executeRawUnsafe(sql)
        if(resultadoUsuarios){
            return true
        }else{
            return false
        }
    }else{
        sql = `insert into usuario(nomeCliente, dataNascimento, email, senha, enderecoId, fotoUsuario)values("${usuarios.nomeCliente}", "${usuarios.dataNascimento}", "${usuarios.email}", "${usuarios.senha}", "${usuarios.enderecoId}", "${usuarios.fotoUsuario}")`
        let resultadoUsuarios = await prisma.$executeRawUnsafe(sql)
        if(resultadoUsuarios){
            return true
        }else{
            return false
        }
    }
}catch(error){
    return false
}
}
const buscarUsuariosPeloId = async function(idUsuario){
    try{
        let sql = `select * from usuario where idUser = ${idUsuario}`
    let resultadoUsuarios = await prisma.$queryRawUnsafe(sql)
    return resultadoUsuarios 
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoUsuarioInserido = async function(){
    try{
let sql = `select idUsuario from usuario order by idUsuario desc limit 1`
    let resultadoUsuarios = await prisma.$queryRawUnsafe(sql)
    return resultadoUsuarios
    }catch(error){
        return false
    }
}
module.exports={
    pegarUsuarios,
    atualizarUsuarios,
    deletarUsuarios,
    colocarUsuarios,
    buscarUsuariosPeloId,
    retornarIdDoUltimoUsuarioInserido
}