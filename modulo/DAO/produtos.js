const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllProdutos = async function(){
    try {
        let sql = 'select * from produtos order by idProduto desc'

        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto
    } catch (error) {
        return false
    }
}

const deleteProdutos = async function(id){
    try {
        let sql = `delete from produtos where idProduto = ${id}`
        let rsProduto = await prisma.$executeRawUnsafe(sql)
        return rsProduto
    } catch (error) {
        return false
    }
}

const selectByIdProdutos = async function (id) {
    try {
        let sql = `select * from produtos where idProduto = ${id}`
    
        let rsProduto = await prisma.$queryRawUnsafe(sql)
        return rsProduto
    
    } catch (error) {
        return false
    }
    
       
    }

const inserirProdutos = async function(produtos){
    try {
        let sql

        sql = `insert into produtos(
            nomeProduto,
            descricaoProduto,
            precoProduto,
            fotoProduto
        ) values (
            '${produtos.nomeProduto}',
            '${produtos.descricaoProduto}',
            '${produtos.precoProduto}',
            '${produtos.fotoProduto}'
        )` 

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


const returnId = async function (){

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from produtos limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const atualizarProdutos = async function(dadosProdutos, idProduto){
    try {
        let sql 
        sql = `update produtos set 
        nomeProduto= '${dadosProdutos.nomeProduto}',
        descricaoProduto= '${dadosProdutos. descricaoProduto}',
        precoProduto= '${dadosProdutos.precoProduto}',
        fotoProduto= '${dadosProdutos. fotoProduto}'
           
        where idProduto = ${idProduto}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports ={
    selectAllProdutos,
    deleteProdutos,
    selectByIdProdutos,
    inserirProdutos,
    returnId,
    atualizarProdutos
}