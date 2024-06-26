const usuariosModelDAO = require("../modulo/DAO/user.js")
const usuariosModuloConfig = require("../model/config.js")
const pegarUsuarios = async function(){
    try{
      let usuariosJSON = {}
    let resultadoUsuarios = await usuariosModelDAO.pegarUsuarios()
    if(resultadoUsuarios){
        if(resultadoUsuarios.length > 0){
            usuariosJSON.status_code = 200
        usuariosJSON.quantidade = resultadoUsuarios.length
        usuariosJSON.usuarios = resultadoUsuarios
        return usuariosJSON
        }else{
            return usuariosModuloConfig.ERROR_NOT_FOUND
        }
    }else{
        return usuariosModuloConfig.ERROR_INTERNAL_SERVER_DB
    }
}catch(error){
    return usuariosModuloConfig.ERROR_INTERNAL_SERVER
}
}
const atualizarUsuarios = async function(idUsuarios, usuarios, contentType){
    try{
        let usuariosJSON = {}
        if(String(contentType).toLowerCase() == 'application/json'){
          if(idUsuarios == " " || idUsuarios == undefined || isNaN(idUsuarios)){
            return usuariosModuloConfig.ERROR_INVALID_ID
          }else{
            const usuariosPeloId = await usuariosModelDAO.buscarUsuariosPeloId(idUsuarios)
            if(usuariosPeloId){
              if(usuariosPeloId.length > 0){
                if(usuarios.nomeCliente == " " || usuarios.nomeCliente == undefined || usuarios.nomeCliente.length > 250 ||
                usuarios.dataNascimento == " " || usuarios.dataNascimento == undefined || usuarios.dataNascimento.length > 10 ||
                usuarios.email == " " || usuarios.email == undefined || usuarios.email.length > 60 ||
                usuarios.senha == ' ' || usuarios.senha == undefined || usuarios.senha.length > 8 ||
                usuarios.fotoUsuario =='' || usuariosModelDAO.fotoUsuario || undefined || usuarios.fotoUsuario.length>250){
                  return usuariosModuloConfig.ERROR_REQUIRED_FIELDS}else{
                      let dadosValidated = false
                      if(usuarios.enderecoId != " " || usuarios.enderecoId != null || usuarios.enderecoId != undefined){
                          dadosValidated = true
                      }else{
                          return usuariosModuloConfig.ERROR_REQUIRED_FIELDS
                      }
                      if(dadosValidated){
                          let usuarios = await usuariosModelDAO.atualizarUsuarios(idUsuarios, usuarios)
                    if(usuarios){
                      usuariosJSON.status = usuariosModuloConfig.SUCESS_EDITED_ITEM.status
                      usuariosJSON.status_code = usuariosModuloConfig.SUCESS_EDITED_ITEM.status_code
                      usuariosJSON.message = usuariosModuloConfig.SUCESS_EDITED_ITEM.message
                      return usuariosJSON
                    }else{
                      return usuariosModuloConfig.ERROR_INTERNAL_SERVER_DB
                    }
                  }
                }
              }if(usuariosPeloId == false){
                return usuariosModuloConfig.ERROR_NOT_FOUND
              }
            }
          }
          }else{
            return usuariosModuloConfig.ERROR_CONTENT_TYPE
          }
        }catch(error){
            return usuariosModuloConfig.ERROR_INTERNAL_SERVER
        }
}
const deletarUsuarios = async function(idUsuarios){
    try{
      if(idUsuarios == " " || idUsuarios == undefined || isNaN(idUsuarios)){
        return usuariosModuloConfig.ERROR_INVALID_ID
      }else{
        const usuariosPeloId = await usuariosModelDAO.buscarUsuariosPeloId(idUsuarios)
        if(usuariosPeloId){
          if(usuariosPeloId.length > 0){
            const usuarios = await usuariosModelDAO.deletarUsuarios(idUsuarios)
            if(usuarios){
              return usuariosModuloConfig.SUCESS_DELETED_ITEM
            }else{
              return usuariosModuloConfig.ERROR_INTERNAL_SERVER_DB
            }
          }else{
            return usuariosModuloConfig.ERROR_NOT_FOUND
          }
        }else{
          return usuariosModuloConfig.ERROR_NOT_FOUND
        }
      }
    }catch(error){
        return usuariosModuloConfig.ERROR_INTERNAL_SERVER
    }
}
const inserirUsuarios = async function(usuarios, contentType){
    try{
        let usuariosJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(usuarios.nomeCliente == " " || usuarios.nomeCliente == undefined || usuarios.nomeCliente.length > 200 ||
          usuarios.dataNascimento == " " || usuarios.dataNascimento == undefined || usuarios.dataNascimento.length > 10 ||
          usuarios.email == " " || usuarios.email == undefined || usuarios.email.length > 20 ||
          usuarios.senha == ' ' || usuarios.senha == undefined || usuarios.senha.length > 20 ||
          usuarios.fotoUsuario =='' || usuarios.fotoUsuario == undefined || usuarios.fotoUsuario.length > 250){
            return usuariosModuloConfig.ERROR_REQUIRED_FIELDS}else{
                let dadosValidated = false
                if(usuarios.enderecoId != "" || usuarios.enderecoId != undefined || usuarios.enderecoId != null){
                    dadosValidated = true
                }else{
                    return usuariosModuloConfig.ERROR_REQUIRED_FIELDS
                }
                if(dadosValidated){
                    let usuariosNovo = await usuariosModelDAO.colocarUsuarios(usuarios)
              if(usuariosNovo){
                let usuariosId = await usuariosModelDAO.retornarIdDoUltimoUsuarioInserido()
                usuariosJSON.status = usuariosModuloConfig.SUCESS_CREATED_ITEM.status
                usuariosJSON.status_code = usuariosModuloConfig.SUCESS_CREATED_ITEM.status_code
                usuariosJSON.message = usuariosModuloConfig.SUCESS_CREATED_ITEM.message
                usuariosJSON.usuarios = usuariosNovo
                usuariosJSON.usuarios.id = usuariosId[0]
                return usuariosJSON
              }else{
                return usuariosModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
            }
          }else{
            return usuariosModuloConfig.ERROR_CONTENT_TYPE
          }
        }catch(error){
          console.log(error)
            return usuariosModuloConfig.ERROR_INTERNAL_SERVER
        }
}
const pegarUsuarioPeloId = async function(idUsuarios){
    try{
      let usuariosJSON = {}
    
        if (idUsuarios == '' || idUsuarios == undefined || isNaN(idUsuarios)) {
            return usuariosModuloConfig.ERROR_INVALID_ID
        } else {
            let usuarios = await usuariosModelDAO.buscarUsuariosPeloId(idUsuarios)
    
            if (usuarios) {
                if (usuarios.length > 0) {
                    usuariosJSON.usuarios = usuarios
                    usuariosJSON.status_code = 200
    
                    return usuariosJSON 
    
                } else {
                    return usuariosModuloConfig.ERROR_NOT_FOUND 
                }
    
            } else {
                return usuariosModuloConfig.ERROR_INTERNAL_SERVER_DB 
            }
        }
    }catch(error){
        return usuariosModuloConfig.ERROR_INTERNAL_SERVER
    }
}
module.exports={
    pegarUsuarios,
    atualizarUsuarios,
    deletarUsuarios,
    inserirUsuarios,
    pegarUsuarioPeloId
}