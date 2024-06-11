const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const pegarPedidos = async function(){
    try{
        let sql = "select * from pedidos"
        let resultadoPedidos = await prisma.$queryRawUnsafe(sql)
        return resultadoPedidos
    }catch(error){
        return false
    }
}
const atualizarPedidos = async function(idPedidos, pedidos){
    try{
let sql = `update pedidos set horarioPedido = "${pedidos.horarioPedido}", valorTotal ="${pedidos.valorTotal}", formaEntrega = "${pedidos.formaEntrega}", dataPedido = "${pedidos.dataPedido}" where idPedidos = ${idPedidos}`
        let resultadoPedidos = await prisma.$executeRawUnsafe(sql)
        return resultadoPedidos
    }catch(error){
        return false
    }
}
const deletarPedidos = async function(idPedidos){
    try{
      let sql = `delete from pedidos where idPedidos = ${idPedidos}`
        let resultadoPedidos = await prisma.$executeRawUnsafe(sql)
        return resultadoPedidos
    }catch(error){
        return false
    }
}
const inserirPedidos = async function(pedidos){
    try{
      let sql = `insert into pedidos(horarioPedido, valorTotal, formaEntrega, dataPedido)values("${pedidos.horarioPedido}", "${pedidos.valorTotal}", "${pedidos.formaEntrega}", "${pedidos.dataPedido}")`
    let resultadoPedidos = await prisma.$executeRawUnsafe(sql)
    if(resultadoPedidos){
        return true
    }else{
        return false
    }
}catch(error){
    return false
}
}
const buscarPedidosPeloId = async function(idPedidos){
    try{
        let sql = `select * from pedidos where idPedidos = ${idPedidos}`
    let resultadoPedidos = await prisma.$queryRawUnsafe(sql)
    return resultadoPedidos
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoPedidoInserido = async function(){
    try{
        let sql = `select idPedidos from pedidos order by idPedidos desc limit 1`
    let resultadoPedidos = await prisma.$queryRawUnsafe(sql)
    return resultadoPedidos
    }catch(error){
        return false
    }
}
module.exports = {
    pegarPedidos,
    atualizarPedidos,
    deletarPedidos,
    inserirPedidos,
    buscarPedidosPeloId,
    retornarIdDoUltimoPedidoInserido
}