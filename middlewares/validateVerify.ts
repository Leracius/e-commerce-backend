import { NextFunction, Request, Response } from "express";

export const isVerify = async(req: Request, res: Response, next: NextFunction) =>{
    const {verified} = req.body.confirmedUser

    if(!verified){
        res.status(401).json({
            msg: "el usuario no esta correctamete verificado"
        })
        return
    }
    next()
} 