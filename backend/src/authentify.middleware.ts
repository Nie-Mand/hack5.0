import * as jwt from 'jsonwebtoken'
import { NextFunction, Request as XRequest, Response} from 'express'


export default function authentify(req: any, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(401).send()
        if (token.split(' ').length < 2) return res.status(401).send()
        token = token.split(' ')[1]
        const payload = jwt.verify(token, "SECREEEEET")
        if (!payload) return res.status(401).send()
        req.user = payload
        next()
    }
    catch {
        return res.status(401).send()
    }

}