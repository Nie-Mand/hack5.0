import { Router } from 'express'
import { Enterprise } from './db'
import invoiceRoute from './invoice.router'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authentify from './authentify.middleware'

const routes = Router()

routes.post('/login', async (req, res) => {

    const username: string = req.body.username
    const password: string = req.body.password

    console.log({
        username, password
    });
    
    const e = await Enterprise.findOne({
        where: {
            username
    }}) 


    console.log(e);
    
    if (!e) 
    return res.status(401).send("user not found")
    
    
    if (await bcrypt.compare(password, e.password)) {

        const token = jwt.sign({
            username: e.username
        }, "SECREEEEET", {
            expiresIn: '20h'
        })

        return res.json({ token })
    }

    return res.status(401).send("password doesnt match")
    
})


routes.get('/me', authentify, async (req: any, res) => {

    console.log(req.user);
    
    const username = req.user.username

    
    const e = await Enterprise.findOne({
        where: {
            username
    }}) 


    if (!e) return res.send(null)

    const data = {
        username: e.username,
        image: e.image,
        title: e.title
    }

    return res.json(data)
})


routes.use('/invoice', invoiceRoute)

export default routes