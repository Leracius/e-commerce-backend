import { Model, Schema, Types, model } from "mongoose";

export interface ProductInterface {
    id: number;
    category: string;
    img: string;
    name: string;
    price: number;
};

const ProductSchema = new Schema<ProductInterface>({
    id: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

const ProductModel : Model<ProductInterface> = model<ProductInterface>("commerce-product", ProductSchema)

export default ProductModel