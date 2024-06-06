const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllCate = async function(){
    try {
        let sql = 'select * from categorias order by idCategorias desc'
        let rsCate = await prisma.$queryRawUnsafe(sql)
        console.log(rsCate)
        return rsCate
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteCategoria = async function(id){
    try {
        let sql = `delete from categorias where idCategorias = ${id}`
        let rsCate = await prisma.$executeRawUnsafe(sql)
        return rsCate
    } catch (error) {
        return false
    }
}

const selectByIdCategoria = async function (id) {
    try {
        let sql = `select * from categorias where idCategorias = ${id}`
    
        let rsCate = await prisma.$queryRawUnsafe(sql)
        return rsCate
    
    } catch (error) {
        return false
    }
    
       
    }

const inserirCategorias = async function(categorias){
    try {
        let sql

        sql = `insert into categorias(
            nomeCategoria
        ) values (
            '${categorias.nomeCategoria}'
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

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from categorias limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const atualizarCategoria = async function(dadosCategorias, idCategorias){
    try {
        let sql 
        sql = `update categorias set nomeCategoria= '${dadosCategorias.nomeCategoria}'
        where idCategorias = ${idCategorias}`

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
    selectAllCate,
    deleteCategoria,
    selectByIdCategoria,
    inserirCategorias,
    returnId,
    atualizarCategoria
}