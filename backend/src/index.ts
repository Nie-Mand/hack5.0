import Express from 'express'
import routes from './routes'
import { getDb } from './db'
import { json } from 'body-parser'
import  cors from 'cors'

const app = Express()

app.use(json())
app.use(cors())
app.use(routes)

getDb().then(() => {
    app.listen(9000, () => {
        console.log('Server is running at port 9000')
    })
})