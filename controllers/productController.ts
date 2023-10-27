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
    
    const product = new ProductModel(newProduct)

    await product.save()
    res.status(200).json({
        product
    })

}