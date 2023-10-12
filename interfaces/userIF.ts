import { Schema, model, Model } from 'mongoose'
import { ROLES } from '../helpers/constants'

export interface UserInterface {
    name: string
    surname: string
    email: string
    password: string
    rol?: string
    verify_code?: string
    verified?: boolean
};

// {
//     "name": "axel",
//     "surname" : "quintana",
//     "email" : "lucasaxelgq15@gmail.com",
//     "password": "contraseña1"
// }
// --POST JSON MODEL--

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: [true, "El nombre es obligario"]
    },
    surname: {
        type: String,
        required: [true, "El apellido es obligario"]
    },
    email: {
        type: String,
        required: [true, "El email es obligario"]
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"]
    },
    rol: {
        type: String,
        default: ROLES.user
    },
    verify_code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){
    const{__V, password, _id, code, ...usuario} = this.toObject()
    return usuario
}


const UserModel: Model<UserInterface> = model<UserInterface>("commerce-user", userSchema);

export default UserModel