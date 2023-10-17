import express, { Express } from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth'
import homeRoutes from '../routes/home'
import ordersRoutes from '../routes/orders'
import { dbconection } from '../database/config'

export class Server {

    authPath: string
    orderPath: string
    app: Express
    port: string | number | undefined

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.authPath= '/auth'
        this.orderPath= '/orders'
        
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    async connectDB(): Promise<void>{
        console.log('base conectada');
        await dbconection()
    }

    middlewares(): void{
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void {
        this.app.use("/", homeRoutes)
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.orderPath, ordersRoutes)    
    }

    listen(): void {
        this.app.listen(this.port, ()=>{
            console.log(`corriendo en ${this.port}`);
            
        })
    }
};