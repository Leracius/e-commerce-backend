import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import OrderModel from "../interfaces/orderIF"
import UserModel, { UserInterface } from "../interfaces/userIF"

const validateJWT = async (req: Request, res: Response, next: NextFunction) =>{

    const token = req.headers["x-token"] as string

    if(!token){
        res.status(401).json({
            msg: "no hay token en la peticion"
        })
        return
    };

    try {
        const secretPass = process.env.SECRET_PASS as string
        const payload = jwt.verify(token, secretPass) as JwtPayload
        
        const {id} = payload

        const confirmedUser: UserInterface | null = await UserModel.findById(id)
        if(!confirmedUser){
            res.status(404).json({
                msg: "usuario no encontrado"
            })
            return
        }

        req.body.confirmedUser = confirmedUser

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no valido"
        })
    }
}

export default validateJWT