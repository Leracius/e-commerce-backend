import { Response, Request } from "express";
import ProductModel, { ProductInterface } from "../interfaces/productIF";

export const getProducts = async(req: Request, res: Response) =>{
    const products = await ProductModel.find({})

    res.status(200).json({
        data: [
            ...products
        ]
    })

}

export const createProduct = async(req: Request, res: Response) => {
    console.log('create-product');
    const newProduct: ProductInterface = req.body
    const adminKey = req.headers["admin-key"]
    
    if(adminKey === process.env.KEY_FOR_ADMIN){
        const product = new ProductModel(newProduct)
        await product.save()
        res.status(200).json({
        product
        });
    }else{
        res.status(400).json({
            msg: "Clave de admin incorrecta"
        })
    }

}