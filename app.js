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
const controllerEndereco = require('./controller/endereco_controller.js')
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

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/lanchonete/ingrediente/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idIngrediente = request.params.id
    let deleteIngrediente = await controllerIngredientes.setExcluirIngredientes(idIngrediente)

    response.status(deleteIngrediente.status_code)
    response.json(deleteIngrediente)
})

app.put('/v1/lanchonete/editeIngrediente/:id', cors(), async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_ingredientes = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerIngredientes.setAtualizarIingrediente(id_ingredientes, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
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

app.delete('/v1/lanchonete/produto/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idProduto = request.params.id
    let deleteProduto = await controllerprodutos.setExcluirProduto(idProduto)

    response.status(deleteProduto.status_code)
    response.json(deleteProduto)
})

app.put('/v1/lanchonete/editeProduto/:id', cors(), async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_produto = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerprodutos.setAtualizarProduto(id_produto, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
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

app.delete('/v1/lanchonete/funcionario/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idFuncionarios = request.params.id
    let deleteFuncionario = await controllerfuncionarios.setExcluirFuncionario(idFuncionarios)

    response.status(deleteFuncionario.status_code)
    response.json(deleteFuncionario)
})

app.put('/v1/lanchonete/editeFuncionario/:id', cors(), async function(request, response, next){
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

app.delete('/v1/lanchonete/promocao/:id', cors(), bodyParserJSON, async function(request, response, next){
    let idPromocoes = request.params.id
    let deletePromocao = await controllerPromocoes.setExcluirPromocao(idPromocoes)

    response.status(deletePromocao.status_code)
    response.json(deletePromocao)
})

app.put('/v1/lanchonete/editePromocao/:id', cors(), async function(request, response, next){
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
    let enderecos = await 

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})