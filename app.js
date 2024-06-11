const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()
})

const bodyParserJSON = bodyParser.json()

/*********************************************************************************/
const controllerCategorias = require('./controller/categorias_controller.js')
const controllerCombos = require('./controller/combos_controller.js')
const controllerEnderecos = require('./controller/endereco_controller.js')
const controllerfuncionarios = require('./controller/funcionarios_controller.js')
const controllerIngredientes = require('./controller/ingredientes_controller.js')
const controllerPagamento = require('./controller/pagamento_controller.js')
const controllerPedidos = require('./controller/pedidos_controller.js')
const controllerprodutos = require('./controller/produtos_controller.js')
const controllerPromocoes = require('./controller/promocoes_controller.js')
const controllerUsuario = require('./controller/usuario_controller.js')
/*********************************************************************************/


/*********************************************Categorias***************************************************** */
app.post('/v1/Lanchonete/categoria', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerCategorias.setInserirCategorias(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v1/lanchonete/categorias', cors(), async function(request, response, next){
    let allCategorias = await controllerCategorias.getListarCate()

    response.status(allCategorias.status_code)
    response.json(allCategorias)
})

app.delete('/v1/lanchonete/categoria/:id', cors(), async function(request,response,next){
    let idCategorias = request.params.id
    let deleteCategoria = await controllerCategorias.setExcluirCategoria(idCategorias)

    response.status(deleteCategoria.status_code)
    response.json(deleteCategoria)
})

app.put('/v1/lanchonete/editeCategoria/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let idCategorias = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerCategorias.setAtualizarCategoria(idCategorias, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


/*********************************************************************************************************** */

/*****************************************************Ingredientes****************************************** */
app.get('/v1/lanchonete/Ingredientes', cors(), async function(request,response,next){
    let allIngredientes = await controllerIngredientes.getListarIngredientes()

    response.status(allIngredientes.status_code)
    response.json(allIngredientes)
})

app.post('/v1/lanchonete/ingrediente', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerIngredientes.inserirIngrediente(dadosBody,contentType)


    console.log(resultDados.status_code);
    

    response.status(resultDados.status_code)
    response.json(resultDados)
    
})

app.delete('/v1/lanchonete/ingrediente/:id', cors(), async function(request, response, next){
    let idIngrediente = request.params.id
    let deleteIngrediente = await controllerIngredientes.setExcluirIngredientes(idIngrediente)

    response.status(deleteIngrediente.status_code)
    response.json(deleteIngrediente)
})

app.put('/v1/lanchonete/editeIngrediente/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_ingredientes = request.params.id

    let dadosBody = request.body
    let resultDados = await controllerIngredientes.setAtualizarIingrediente(id_ingredientes, contentType, dadosBody)
    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.get('/v1/lanchonete/ingredienteId/:id', cors(), async function(request, response, next){
    let idIngrediente = request.params.id

    let dadosIngrediente= await controllerIngredientes.getBuscarIngredienteId(idIngrediente)

    response.status(dadosIngrediente.status_code)
    response.json(dadosIngrediente)
})

/*********************************************************************************************************** */

/*****************************************************Produtos****************************************** */
app.get('/v1/lanchonete/produtos', cors(), async function(request,response,next){
    let allProdutos = await controllerprodutos.getListarProdutos()

    response.status(allProdutos.status_code)
    response.json(allProdutos)
})

app.post('/v1/lanchonete/produto', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerprodutos.setInserirProdutos(dadosBody,contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/lanchonete/produto/:id', cors(), async function(request, response, next){
    let idProduto = request.params.id
    let deleteProduto = await controllerprodutos.setExcluirProduto(idProduto)

    response.status(deleteProduto.status_code)
    response.json(deleteProduto)
})

app.put('/v1/lanchonete/editeProduto/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_produto = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerprodutos.setAtualizarProduto(id_produto, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.get('/v1/lanchonete/produtoId/:id', cors(), async function(request, response, next){
    let idProduto = request.params.id

    let dadosProdutos= await controllerprodutos.getBuscarProdutoId(idProduto)

    response.status(dadosProdutos.status_code)
    response.json(dadosProdutos)
})


/*********************************************************************************************************** */

/*****************************************************funcionarios****************************************** */
app.get('/v1/lanchonete/funcionarios', cors(), async function(request,response,next){
    let allfuncionarios = await controllerfuncionarios.getListarFuncionarios()

    response.status(allfuncionarios.status_code)
    response.json(allfuncionarios)
})

app.post('/v1/lanchonete/funcionario', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerfuncionarios.setInserirFuncionarios(dadosBody,contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/lanchonete/funcionario/:id', cors(), async function(request, response, next){
    let idFuncionarios = request.params.id
    let deleteFuncionario = await controllerfuncionarios.setExcluirFuncionario(idFuncionarios)

    response.status(deleteFuncionario.status_code)
    response.json(deleteFuncionario)
})

app.put('/v1/lanchonete/editeFuncionario/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_funcionario = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerfuncionarios.setAtualizarFuncionario(id_funcionario, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/*********************************************************************************************************** */

/*****************************************************promocoes****************************************** */
app.get('/v1/lanchonete/promocoes', cors(), async function(request,response,next){
    let allPromocoes = await controllerPromocoes.getListarPromocoes()

    response.status(allPromocoes.status_code)
    response.json(allPromocoes)
})

app.post('/v1/lanchonete/promocao', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerPromocoes.setInserirPromocoes(dadosBody,contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/lanchonete/promocao/:id', cors(), async function(request, response, next){
    let idPromocoes = request.params.id
    let deletePromocao = await controllerPromocoes.setExcluirPromocao(idPromocoes)

    response.status(deletePromocao.status_code)
    response.json(deletePromocao)
})

app.put('/v1/lanchonete/editePromocao/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_promocao = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerPromocoes.setAtualizarPromocao(id_promocao, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})
/***********************************************************************************************************/
/*****************************************************endereco**********************************************/
app.get("/v1/Lanchonete/enderecos", cors(), async function(request, response, next){
    let enderecos = await controllerEnderecos.pegarEnderecos()
    response.status(enderecos.status_code)
    response.json(enderecos)
})
app.put("/v1/Lanchonete/editarEnderecos/:id", cors(), bodyParserJSON, async function(request, response, next){
    let idEnderecos = request.params.id
    let enderecos = request.body
    let contentType = request.headers["content-type"]
    let resultadoEnderecos = await controllerEnderecos.atualizarEnderecos(enderecos, idEnderecos, contentType)
    response.status(resultadoEnderecos.status_code)
    response.json(resultadoEnderecos)
})
app.delete("/v1/Lanchonete/deletarEnderecos/:id", cors(), async function(request, response, next){
    let idEnderecos = request.params.id
    let resultadoEnderecos = await controllerEnderecos.deletarEnderecos(idEnderecos)
    response.status(resultadoEnderecos.status_code)
    response.json(resultadoEnderecos)
})
app.post("/v1/Lanchonete/postarEnderecos/", cors(), bodyParserJSON, async function(request, response, next){
    let enderecos = request.body
    let contentType = request.headers["content-type"]
    const resultadoEnderecos = await controllerEnderecos.inserirEnderecos(enderecos, contentType)
    response.status(resultadoEnderecos.status_code)
    response.json(resultadoEnderecos)
})
/*************************************************************************************************************/
/*****************************************************usuarios**********************************************/
app.get("/v1/Lanchonete/usuarios", cors(), async function(request, response, next){
    let usuarios = await controllerUsuario.pegarUsuarios()
    response.status(usuarios.status_code)
    response.json(usuarios)
})
app.put("/v1/Lanchonete/editarUsuarios/:id", cors(), bodyParserJSON, async function(request, response, next){
    let idUsuarios = request.params.id
    let usuarios = request.body
    let contentType = request.headers["content-type"]
    let resultadoUsuarios = await controllerUsuario.atualizarUsuarios(usuarios, idUsuarios, contentType)
    response.status(resultadoUsuarios.status_code)
    response.json(resultadoUsuarios)
})
app.delete("/v1/Lanchonete/deletarUsuarios/:id", cors(), async function(request, response, next){
    let idUsuarios = request.params.id
    let resultadoUsuarios = await controllerUsuario.deletarUsuarios(idUsuarios)
    response.status(resultadoUsuarios.status_code)
    response.json(resultadoUsuarios)
})
app.post("/v1/Lanchonete/postarUsuarios/", cors(), bodyParserJSON, async function(request, response, next){
    let usuarios = request.body
    let contentType = request.headers["content-type"]
    const resultadoUsuarios = await controllerUsuario.inserirUsuarios(usuarios, contentType)
    response.status(resultadoUsuarios.status_code)
    response.json(resultadoUsuarios)
})
app.get("/v1/Lanchonete/usuarios/:id", cors(), async function(request, response, next){
    let idUsuarios = request.params.id
    let usuarios = await controllerUsuario.pegarUsuarioPeloId(idUsuarios)
    response.status(usuarios.status_code)
    response.json(usuarios)
})
/*************************************************************************************************/
/******************************************pedidos***********************************************/
app.get("/v1/Lanchonete/pedidos", cors(), async function(request, response, next){
    const pedidos = await controllerPedidos.buscarPedidos()
    response.status(pedidos.status_code)
    response.json(pedidos)
})
app.put("/v1/Lanchonete/editarPedidos/:id", cors(), bodyParserJSON, async function(request, response, next){
    let idPedidos = request.params.id
    let pedidos = request.body
    let contentType = request.headers["content-type"]
    let resultadoPedidos = await controllerPedidos.atualizarPedidos(idPedidos, pedidos, contentType)
    response.status(resultadoPedidos.status_code)
    response.json(resultadoPedidos)
})
app.delete("/v1/Lanchonete/deletarPedidos/:id", cors(), async function(request, response, next){
    let idPedidos = request.params.id
    let resultadoPedidos = await controllerPedidos.deletarPedidos(idPedidos)
    response.status(resultadoPedidos.status_code)
    response.json(resultadoPedidos)
})
app.post("/v1/Lanchonete/postarPedidos/", cors(), bodyParserJSON, async function(request, response, next){
    let pedidos = request.body
    let contentType = request.headers["content-type"]
    const resultadoPedidos = await controllerPedidos.colocarPedidos(pedidos, contentType)
    response.status(resultadoPedidos.status_code)
    response.json(resultadoPedidos)
})
app.get("/v1/Lanchonete/pedidos/:id", cors(), async function(request, response, next){
    let idPedidos = request.params.id
    let pedidos = await controllerPedidos.pegarPedidoPeloId(idPedidos)
    response.status(pedidos.status_code)
    response.json(pedidos)
})
    let enderecos = await 

/***************************************************** combos ****************************************** */
app.get('/v1/lanchonete/combos', cors(), async function(request,response,next){
    let allCombos = await controllerCombos.getListarCombos()

    response.status(allCombos.status_code)
    response.json(allCombos)
})

app.post('/v1/lanchonete/combo', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerCombos.setInserirCombos(dadosBody,contentType)


    console.log(resultDados.status_code);
    

    response.status(resultDados.status_code)
    response.json(resultDados)
    
})

app.delete('/v1/lanchonete/combo:id', cors(), async function(request, response, next){
    let idCombo = request.params.id
    let deleteCombo = await controllerCombos.setExcluirCombo(idCombo)

    response.status(deleteCombo.status_code)
    response.json(deleteCombo)
})

app.put('/v1/lanchonete/editeCombo/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_combo = request.params.id

    let dadosBody = request.body
    let resultDados = await controllerCombos.setAtualizarCombo(id_combo, contentType, dadosBody)
    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.get('/v1/lanchonete/comboId/:id', cors(), async function(request, response, next){
    let idCombo = request.params.id

    let dadosCombo= await controllerCombos.getBuscarComboId(idCombo)

    response.status(dadosCombo.status_code)
    response.json(dadosCombo)
})

/*********************************************************************************************************** */

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})