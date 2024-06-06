const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllIngredientes = async function(){

    try {
        let sql 

        sql = 'select * from ingredientes order by id_ingredientes desc'

        let rsIngredientes = await prisma.$queryRawUnsafe(sql)
        return rsIngredientes

    } catch (error) {

        return false
    }
}

const deleteIngrediente = async function (id){
    try {
        let sql
        sql = `delete from ingredientes where id_ingredientes = ${id}`
        let rsIngredientes = await prisma.$executeRawUnsafe(sql)

        return rsIngredientes
    } catch (error) {
        return false
    }
}

const insertIngrediente = async function(dadosIngredientes){
    try {
        let sql
        sql = `insert into ingredientes(
            nome_ingrediente,
            quantidade_ingredientes,
            marca_ingredientes,
            data_validade,
            foto_ingrediente
        ) values (
            '${dadosIngredientes.nome_ingrediente}',
            '${dadosIngredientes.quantidade_ingredientes}',
            '${dadosIngredientes.marca_ingredientes}',
            '${dadosIngredientes.data_validade}',
            '${dadosIngredientes.foto_ingrediente}'
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


const updateIngrediente = async function (dadosIngredientes, id){
    try {
        let sql 

        sql = `update ingredientes set 
        nome_ingrediente = '${dadosIngredientes.nome_ingrediente}',
        quantidade_ingredientes = '${dadosIngredientes.quantidade_ingredientes}',
        marca_ingredientes = '${dadosIngredientes.marca_ingredientes}',
        data_validade = '${dadosIngredientes.data_validade}',
        foto_ingrediente = '${dadosIngredientes.foto_ingrediente}'
        where id_ingredientes = ${id}`

        
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

const selectByIdIngredientes = async function (id) {
        try {
            let sql = `select * from ingredientes where id_ingredientes = ${id}`
            let rsIngredientes = await prisma.$queryRawUnsafe(sql)
            return rsIngredientes
        
        } catch (error) {
            return false
    }
                 
}

const returnId = async function (){

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from ingredientes limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

module.exports ={
    selectAllIngredientes,
    selectByIdIngredientes,
    returnId,
    deleteIngrediente,
    insertIngrediente,
    updateIngrediente
}