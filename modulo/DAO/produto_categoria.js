const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllProdutoCategoria = async function(){

    try {
        let sql = ' select produto_categoria.idProduto_categoria, produto_categoria.categoriaId, produto_categoria.idProdutos, categorias.idCategorias, categorias.nomeCategoria,produtos.idProduto, produtos.nomeProduto, produtos.descricaoProduto, produtos.precoProduto, produtos.fotoProduto from produto_categoria inner join categorias on produto_categoria.categoriaId = categorias.idCategorias inner join produtos on produto_categoria.idProdutos = produtos.idProduto;'
        let rsProdutoCategoria = await prisma.$queryRawUnsafe(sql)
        return rsProdutoCategoria
    } catch (error) {
        return false
    }
}

const inserirProdutoCategoria = async function(produtoCategoria){
    try {
        let sql

        sql = `insert into produto_categoria(
            categoriaId,
            idProdutos
        ) values (
            '${produtoCategoria.categoriaId}',
            '${produtoCategoria.idProdutos}'
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

const atualizarProdutoCategoria = async function(dadosProdutoCategoria, idProduto_categoria){
    try {
        let sql 
        sql = `update produto_categoria set
         categoriaId = '${dadosProdutoCategoria.categoriaId}',
         idProdutos = '${dadosProdutoCategoria.idProdutos}'
    
         where idProduto_categoria = ${idProduto_categoria}`

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

const selectByIdProdutosCategoria = async function (id) {
    try {
        let sql = `select * from produto_categoria where idProduto_categoria = ${id}`
    
        let rsProdutoCategoria = await prisma.$queryRawUnsafe(sql)
        return rsProdutoCategoria
    
    } catch (error) {
        return false
    }
    
       
    }

    const returnId = async function (){

        try {
    
            let sql = 'select CAST(last_insert_id() AS DECIMAL) as idProduto_categoria from produto_categoria limit 1'
            let rsId = await prisma.$queryRawUnsafe(sql)
            return rsId
    
        } catch (error) {
            
            return false
        }
      
    }

    
const deleteProdutoCategoria = async function(id){
    try {
        let sql = `delete from produto_categoria where idProduto_categoria = ${id}`
        let rsProduCate = await prisma.$executeRawUnsafe(sql)
        return rsProduCate
    } catch (error) {
        return false
    }
}
    

module.exports = {
    selectAllProdutoCategoria,
    inserirProdutoCategoria,
    selectByIdProdutosCategoria,
    returnId,
    atualizarProdutoCategoria
}