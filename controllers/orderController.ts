import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import OrderModel, { OrderInterface } from "../interfaces/orderIF";

export const getOrders = async (req: Request, res: Response) =>{
    
    const userID: ObjectId = req.body.confirmedUser._id

    const consult = {user: userID}
    
    const orders = await OrderModel.find(consult)

    res.status(200).json({
        data: [
            ...orders

        ],
        userID: userID
    })
    
}

export const createOrder = async (req: Request, res: Response) => {
    //OBJECTID QUE RETORNA EL GETORDERS
    const userID: ObjectId = req.body.confirmedUser._id

    //DATA QUE LLEGA EN EL BODY
    const orderData: OrderInterface = req.body

    //PROPIEDADES CREADAS DESDE EL LADO DEL SERVIDOR
    const data = {
        ...orderData,
        user: userID,
        createdAt: new Date(), 
        status: "pending"
    }

    const order = new OrderModel(data)
    await order.save()

    res.status(200).json({
        order
    })
}
