const pedidosModelDAO = require("../modulo/DAO/pedidos.js")
const pedidosModuloConfig = require("../model/config.js")
const buscarPedidos = async function(){
    try{
        let pedidosJSON = {}
    const resultadoPedidos = await pedidosModelDAO.pegarPedidos()
  if(resultadoPedidos){
    if(resultadoPedidos.length > 0){
      pedidosJSON.pedidos = resultadoPedidos
      pedidosJSON.quantidade = resultadoPedidos.length
      pedidosJSON.status = 200
      return pedidosJSON
    }else{
      return pedidosModuloConfig.ERROR_NOT_FOUND
    }
  }else{
    return pedidosModuloConfig.ERROR_INTERNAL_SERVER_DB
  }
}catch(error){
    return pedidosModuloConfig.ERROR_INTERNAL_SERVER
}
}
const atualizarPedidos = async function(idPedidos, pedidos, contentType){
    try{
        let pedidosJSON = {}
        if(String(contentType).toLowerCase() == 'application/json'){
          if(idPedidos == " " || idPedidos == undefined || isNaN(idPedidos)){
            return pedidosModuloConfig.ERROR_INVALID_ID
          }else{
            const pedidosPeloId = await pedidosModelDAO.buscarPedidosPeloId(idPedidos)
            if(pedidosPeloId){
              if(pedidosPeloId.length > 0){
                if(pedidos.horarioPedido == " " || pedidos.horarioPedido == undefined || pedidos.horarioPedido.length > 5 ||
                pedidos.valorTotal == " " || pedidos.valorTotal == undefined || pedidos.valorTotal.length > 5 ||
                pedidos.formaEntrega == " " || pedidos.formaEntrega == undefined || pedidos.formaEntrega.length > 45 ||
                pedidos.dataPedido == ' ' || pedidos.dataPedido == undefined || pedidos.dataPedido.length > 10 ||
                pedidos.pagamentoId =='' || pedidos.pagamentoId == undefined || isNaN(pedidos.pagamentoId) ||
                pedidos.statusPedido =='' || pedidos.statusPedido ==undefined || pedidos.statusPedido.length>20){
                  return pedidosModuloConfig.ERROR_REQUIRED_FIELDS}else{
                    let pedidos = await pedidosModelDAO.atualizarPedidos(idPedidos, pedidos)
                    if(pedidos){
                      pedidosJSON.status = pedidosModuloConfig.SUCESS_EDITED_ITEM.status
                      pedidosJSON.status_code = pedidosModuloConfig.SUCESS_EDITED_ITEM.status_code
                      pedidosJSON.message = pedidosModuloConfig.SUCESS_EDITED_ITEM.message
                      return pedidosJSON
                    }else{
                      return pedidosModuloConfig.ERROR_INTERNAL_SERVER_DB
                    }
                  }
                }
              }if(pedidosPeloId == false){
                return pedidosModuloConfig.ERROR_NOT_FOUND
              }
            }
          }else{
            return pedidosModuloConfig.ERROR_CONTENT_TYPE
          }
        }catch(error){
            return pedidosModuloConfig.ERROR_INTERNAL_SERVER
        }
}
const deletarPedidos = async function(idPedidos){
    try{
      if(idPedidos == " " || idPedidos == undefined || isNaN(idPedidos)){
      return pedidosModuloConfig.ERROR_INVALID_ID
    }else{
      const pedidosPeloId = await pedidosModelDAO.buscarPedidosPeloId(idPedidos)
      if(pedidosPeloId){
        if(pedidosPeloId.length > 0){
          const pedidos = await pedidosModelDAO.deletarPedidos(idPedidos)
          if(pedidos){
            return pedidosModuloConfig.SUCESS_DELETED_ITEM
          }else{
            return pedidosModuloConfig.ERROR_INTERNAL_SERVER_DB
          }
        }else{
          return pedidosModuloConfig.ERROR_NOT_FOUND
        }
      }else{
        return pedidosModuloConfig.ERROR_NOT_FOUND
      }
    }
}catch(error){
    return pedidosModuloConfig.ERROR_INTERNAL_SERVER
}
}
const colocarPedidos = async function(pedidos, contentType){
  try{
    let pedidosJSON = {}
  if(String(contentType).toLowerCase() == 'application/json'){
          if(pedidos.horarioPedido == " " || pedidos.horarioPedido == undefined || pedidos.horarioPedido.length > 5 ||
          pedidos.valorTotal == " " || pedidos.valorTotal == undefined || pedidos.valorTotal.length > 5 ||
          pedidos.formaEntrega == " " || pedidos.formaEntrega == undefined || pedidos.formaEntrega.length > 45 ||
          pedidos.dataPedido == ' ' || pedidos.dataPedido == undefined || pedidos.dataPedido.length > 10 ||
          pedidos.pagamentoId =='' || pedidos.pagamentoId == undefined || isNaN(pedidos.pagamentoId) ||
                pedidos.statusPedido =='' || pedidos.statusPedido ==undefined || pedidos.statusPedido.length>20){
            return pedidosModuloConfig.ERROR_REQUIRED_FIELDS}else{
              let pedidos = await pedidosModelDAO.inserirPedidos(pedidos)
              if(pedidos){
                let pedidosId = await pedidosModelDAO.retornarIdDoUltimoPedidoInserido()
                pedidosJSON.status = pedidosModuloConfig.SUCESS_EDITED_ITEM.status
                pedidosJSON.status_code = pedidosModuloConfig.SUCESS_EDITED_ITEM.status_code
                pedidosJSON.message = pedidosModuloConfig.SUCESS_EDITED_ITEM.message
                pedidosJSON.pedidos = pedidos
                pedidosJSON.pedidos.id = pedidosId[0].idPedidos
                return pedidosJSON
              }else{
                return pedidosModuloConfig.ERROR_INTERNAL_SERVER_DB
              }
            }
          }else{
            return pedidosModuloConfig.ERROR_CONTENT_TYPE
          }
        }catch(error){
          return pedidosModuloConfig.ERROR_INTERNAL_SERVER
        }
}
const pegarPedidoPeloId = async function(idPedidos){
  try{
    let pedidosJSON = {}
        if (idPedidos == '' || idPedidos == undefined || isNaN(idPedidos)) {
            return pedidosModuloConfig.ERROR_INVALID_ID
        } else {
            let pedidos = await pedidosModelDAO.buscarPedidosPeloId(idPedidos)
            if (pedidos) {
                if (pedidos.length > 0){
                    pedidosJSON.ingredientes = pedidos
                    pedidosJSON.status_code = 200
                    return pedidosJSON 
                } else {
                    return pedidosModuloConfig.ERROR_NOT_FOUND 
                }
            } else {
                return pedidosModuloConfig.ERROR_INTERNAL_SERVER_DB 
            }
        }
      }catch(error){
        return pedidosModuloConfig.ERROR_INTERNAL_SERVER
      }
}
module.exports={
  buscarPedidos,
  atualizarPedidos,
  deletarPedidos,
  colocarPedidos,
  pegarPedidoPeloId
}