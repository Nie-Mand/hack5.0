import { NextFunction, Request, RequestHandler, Response, Router } from 'express'
import authentify from './authentify.middleware'
import main from './app'
import { processTransaction } from './stripe'


const injectService: RequestHandler = async (req: any, res, next) => {
    const services = await main().catch(error => {
        console.error('******** FAILED to run the application:', error);
        process.exitCode = 1;
    })

    console.log("services", services);
    

    req.services = services

    next()
}

const route = Router()

route.get('/done', [authentify, injectService], async (req: any, res: Response) => {
    try {
        const username = req.user.username
        const data = await req.services.getMyInvoices(username)
        return res.json(data)
    } catch (e: any) {
        console.log(e);
        return res.status(500).send({
            error: true
        })
    }
})

route.get('/unhandled', [authentify, injectService], async (req: any, res: Response) => {
    try {
        console.log("req.services", req.services);
        const username = req.user.username
        const data = await req.services.getUnhandledInvoices(username)
        console.log({ data })
        return res.json(data)
    } catch (e: any) {
        console.log(e);
        return res.status(500).send({
            error: true
        })
    }
})

route.post('/webhook', [injectService], async (req: any, res: Response) => {
    const data = (req.body as any).data.object;
    console.log(data.payment_status);
    console.log(data);
    if (data.payment_status === 'paid') {
        const pl = data.payment_link
        await req.services.signInvoice(pl)
    }

    return res.send("thanks")
})

route.post('/', [authentify, injectService], async (req: any, res: Response) => {
    try {
        const data = {
            owner: req.user.username,
            ...req.body
        }

        await req.services.createInvoice(data)
        return res.send("done")
    } catch (e: any) {
        console.log(e);
        return res.status(500).send({
            error: true
        })
    }
})

// getUnhandledInvoices: (owner: string) => _getUnhandledInvoices(contract, owner),
// getMyInvoices: (owner: string) => _getMyInvoices(contract, owner),
// signInvoice: (id: string) => _signInvoice(contract, id),

route.put('/sign/:id', [authentify, injectService], async (req: any, res: Response) => {
    try {
        const id = req.params.id
        await req.services.signInvoice(id)
        return res.send("done")
    } catch (e: any) {
        return res.status(500).send({
            error: true
        })
    }
})

export default route