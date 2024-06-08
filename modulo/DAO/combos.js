const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllCombos = async function(){
    try {
        let sql = 'select * from combos order by idCombo desc'

        let rsCombo = await prisma.$queryRawUnsafe(sql)
        return rsCombo
    } catch (error) {
        return false
    }
}

const deleteCombos = async function(id){
    try {
        let sql = `delete from combos where idCombo = ${id}`
        let rsCombo = await prisma.$executeRawUnsafe(sql)
        return rsCombo
    } catch (error) {
        return false
    }
}

const selectByIdCombos = async function (id) {
    try {
        let sql = `select * from combos where idCombo = ${id}`
    
        let rsCombo = await prisma.$queryRawUnsafe(sql)
        return rsCombo
    
    } catch (error) {
        return false
    }
    
       
    }

const inserirCombos = async function(combos){
    try {
        let sql

        sql = `insert into combos(
            titulo,
            fotoCombo,
            precoCombo,
            descricaoCombo
        ) values (
            '${combos.titulo}',
            '${combos.fotoCombo}',
            '${combos.precoCombo}',
            '${combos.descricaoCombo}'
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

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from combos limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const atualizarCombos = async function(dadosCombos, idCombo){
    try {
        let sql 
        sql = `update combos set 
        titulo= '${dadosCombos.titulo}',
        fotoCombo= '${dadosCombos. fotoCombo}',
        precoCombo= '${dadosCombos.precoCombo}',
        descricaoCombo= '${dadosCombos. descricaoCombo}'
           
        where idCombos = ${idCombo}`


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
    selectAllCombos,
    deleteCombos,
    selectByIdCombos,
    inserirCombos,
    returnId,
    atualizarCombos
}