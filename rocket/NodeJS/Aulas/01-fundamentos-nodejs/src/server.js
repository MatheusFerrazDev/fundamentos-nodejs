import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// UUID => Unique Universal ID 

// Query Parameters: URL Stateful => Filtros, Paginação, Não obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de formulário (HTTPs)


const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    const route = routes.find (route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        return route.handler(request, response)
    }

    return response.writeHead(404).end('Não encontrado')
})

server.listen(3333)