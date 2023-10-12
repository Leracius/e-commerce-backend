import express, { Express } from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth'
import { dbconection } from '../database/config'

export class Server {

    authPath: string
    app: Express
    port: string | number | undefined

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.authPath= '/auth'
        
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
        this.app.use(this.authPath, authRoutes)    
    }

    listen(): void {
        this.app.listen(this.port, ()=>{
            console.log(`corriendo en ${this.port}`);
            
        })
    }
};