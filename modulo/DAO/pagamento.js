const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const pegarFormaPagamento = async function(){
    try{
        let sql = `select * from formaPagamento`
    let resultadoFormaPagamento = await prisma.$queryRawUnsafe(sql)
    return resultadoFormaPagamento
    }catch(error){
        return false
    }
}
const atualizarFormasPagamento = async function(formasPagamento, idFormasPagamento){
    try{
        let sql 
        if(formasPagamento.cupom =='' || formasPagamento.cupom == null || formasPagamento.cupom == undefined){
        sql = `update formaPagamento set tipoPagamento = "${formasPagamento.tipoPagamento}", bandeira = "${formasPagamento.bandeira}", statusPagamento = "${formasPagamento.statusPagamento}", cpf = "${formasPagamento.cpf}", cupom = null where idPagamento = ${idFormasPagamento}`
        let resultadoFormasPagamento = await prisma.$executeRawUnsafe(sql)
        return resultadoFormasPagamento
        }else{
        sql = `update formaPagamento set tipoPagamento = "${formasPagamento.tipoPagamento}", bandeira = "${formasPagamento.bandeira}", statusPagamento = "${formasPagamento.statusPagamento}", cpf = "${formasPagamento.cpf}", cupom = "${formasPagamento.cupom}" where idPagamento = ${idFormasPagamento}`
        let resultadoFormasPagamento = await prisma.$executeRawUnsafe(sql)
        return resultadoFormasPagamento
        }
    }catch(error){
        return false
    }
}
const deletarFormasPagamento = async function(idFormasPagamento){
    try{
        let sql = `delete from formaPagamento where idPagamento = ${idFormasPagamento}`
        let resultadoFormasPagamento = await prisma.$executeRawUnsafe(sql)
        return resultadoFormasPagamento
    }catch(error){
        return false
    }
}
const inserirFormasPagamento = async function(formasPagamento){
    try{
    let sql 
        if(formasPagamento.cupom =='' || formasPagamento.cupom == null || formasPagamento.cupom == undefined){
        sql = `insert into formaPagamento(tipoPagamento, bandeira, statusPagamento, cpf, cupom)values("${formasPagamento.tipoPagamento}", "${formasPagamento.bandeira}", "${formasPagamento.statusPagamento}", "${formasPagamento.cpf}", null)`
        let resultadoFormasPagamento = await prisma.$executeRawUnsafe(sql)
        if(resultadoFormasPagamento){
            return true
        }else{
            return false
        }
        }else{
        sql = `insert into formaPagamento(tipoPagamento, bandeira, statusPagamento, cpf, cupom)values("${formasPagamento.tipoPagamento}", "${formasPagamento.bandeira}", "${formasPagamento.statusPagamento}", "${formasPagamento.cpf}", "${formasPagamento.cupom}")`
        let resultadoFormasPagamento = await prisma.$executeRawUnsafe(sql)
        if(resultadoFormasPagamento){
            return true
        }else{
            return false
        }
        }
}catch(error){
    return false
}
}
const buscarFormasPagamentoPeloId = async function(idFormasPagamento){
    try{
        let sql = `select * from formaPagamento where idPagamento = ${idFormasPagamento}`
    let resultadoFormasPagamento = await prisma.$queryRawUnsafe(sql)
    return resultadoFormasPagamento
    }catch(error){
        return false
    }
}
const retornarIdDoUltimoformaPagamentoInserido = async function(){
    try{
        let sql = `select idPagamento from formaPagamento order by idPagamento desc limit 1`
    let resultadoFormasPagamento = await prisma.$queryRawUnsafe(sql)
    return resultadoFormasPagamento
    }catch(error){
        return false
    }
}
module.exports={
    pegarFormaPagamento,
    atualizarFormasPagamento,
    deletarFormasPagamento,
    inserirFormasPagamento,
    buscarFormasPagamentoPeloId,
    retornarIdDoUltimoformaPagamentoInserido
}