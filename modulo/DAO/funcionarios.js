const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllFuncionarios = async function(){
    try {
        let sql = 'select * from funcionarios order by idFuncionarios desc'

        let rsFuncionario = await prisma.$queryRawUnsafe(sql)
        return rsFuncionario
    } catch (error) {
        return false
    }
}

const deleteFuncionario = async function(id){
    try {
        let sql = `delete from funcionarios where idFuncionarios = ${id}`
        let rsFuncionario = await prisma.$executeRawUnsafe(sql)
        return rsFuncionario
    } catch (error) {
        return false
    }
}

const selectByIdFuncionario = async function (id) {
    try {
        let sql = `select * from funcionarios where idFuncionarios = ${id}`
    
        let rsFuncionario = await prisma.$queryRawUnsafe(sql)
        return rsFuncionario
    
    } catch (error) {
        return false
    }
    
       
    }

const inserirFuncionarios = async function(funcionarios){
    try {
        let sql

        sql = `insert into funcionarios(
            nomeFuncionario,
            senhaFuncionario,
            emailFuncionario
        ) values (
            '${funcionarios.nomeFuncionario}',
            '${funcionarios.senhaFuncionario}',
            '${funcionarios.emailFuncionario}'
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

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from funcionarios limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const atualizarFuncionario = async function(dadosFuncionario, idFuncionarios){
    try {
        let sql 
        sql = `update funcionarios set 
        nomeFuncionario= '${dadosFuncionario.nomeFuncionario}',
        senhaFuncionario= '${dadosFuncionario.senhaFuncionario}',
        emailFuncionario= '${dadosFuncionario. emailFuncionario}'
           
        where idFuncionarios = ${idFuncionarios}`

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
    selectAllFuncionarios,
    deleteFuncionario,
    selectByIdFuncionario,
    inserirFuncionarios,
    returnId,
    atualizarFuncionario
}