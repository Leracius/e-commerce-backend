import { Model, Schema, Types, model } from "mongoose";

interface ShippingDetails{
    name: String,
    cellphone: String,
    location: String,
    address: String
};

interface IItems {
    category: String,
    id: Number,
    img: String,
    name: String,
    price: Number, 
    quantity: Number,
};

export interface OrderInterface {
    createdAt: Date,
    user: Types.ObjectId,
    price: Number,
    shippingCost: Number,
    items: IItems[],
    shippingDetails: ShippingDetails,
    status: String,
    total: Number,
};

const OrderSchema = new Schema<OrderInterface>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    //cuando guardo un objet id hay que decirle a que object hace referencia 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'commerce-user',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        required: true,
    },
    items: {
        type: [{
            desc: {
                type: String,
                required: true,
            },
            id: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        }],
        required: true,
    },
    shippingDetails: {
        name: {
			type: String,
			required: true,
		},
		cellphone: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
});

const OrderModel: Model<OrderInterface> = model<OrderInterface>("commerce-order", OrderSchema);

export default OrderModel;