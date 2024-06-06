const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPromocoes = async function(){
    try {
        let sql = 'select * from promocoes order by idPromocoes desc'

        let rsPromocoes = await prisma.$queryRawUnsafe(sql)
        return rsPromocoes
    } catch (error) {
        return false
    }
}

const deletePromocoes = async function(id){
    try {
        let sql = `delete from promocoes where idPromocoes = ${id}`
        let rsPromocoes = await prisma.$executeRawUnsafe(sql)
        return rsPromocoes
    } catch (error) {
        return false
    }
}

const selectByIdPromocoes = async function (id) {
    try {
        let sql = `select * from promocoes where idPromocoes = ${id}`
    
        let rsPromocoes = await prisma.$queryRawUnsafe(sql)
        return rsPromocoes
    
    } catch (error) {
        return false
    }
    
       
    }

const inserirPromocoes = async function(promocoes){
    try {
        let sql

        sql = `insert into promocoes(
            precoPromocao,
            nomePromocao,
            fotoPromocional
        ) values (
            '${promocoes.precoPromocao}',
            '${promocoes.nomePromocao}',
            '${promocoes.fotoPromocional}'
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

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from promocoes limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const atualizarPromocoes = async function(dadospromocoes, idPromocoes){
    try {
        let sql 
        sql = `update promocoes set 
        precoPromocao= '${dadospromocoes.precoPromocao}',
        nomePromocao= '${dadospromocoes. nomePromocao}',
        fotoPromocional= '${dadospromocoes.fotoPromocional}'
           
        where idPromocoes = ${idPromocoes}`

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
    selectAllPromocoes,
    deletePromocoes,
    selectByIdPromocoes,
    inserirPromocoes,
    returnId,
    atualizarPromocoes
}