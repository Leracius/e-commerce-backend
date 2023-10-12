import { Request, Response } from "express";
import { ROLES } from "../helpers/constants";
import UserModel, { UserInterface } from "../interfaces/userIF";
import bcryptjs from 'bcryptjs'
import randomstring from "randomstring"
import { sendEmail } from "../helpers/mailer";
import { genJwt } from "../helpers/genJWT";


export const register = async(req: Request, res: Response) =>{
    const {name, surname, email, password, rol}: UserInterface = req.body

    const userToSend = new UserModel({name, surname, email, password, rol})

    const salt = bcryptjs.genSaltSync()

    userToSend.password = bcryptjs.hashSync(password, salt)
    
    const adminKey = req.headers["admin-key"]

    if(adminKey === process.env.KEY_FOR_ADMIN){
        userToSend.rol = ROLES.admin
    }

    const newCode = randomstring.generate(6)

    userToSend.verify_code = newCode

    await userToSend.save()

    console.log(email);
    
    await sendEmail(email, newCode)

    res.status(200).json({
        msg: "Register successfully",
    })

};

export const login = async( req: Request, res: Response): Promise<void> =>{
    const { email, password } : UserInterface = req.body

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            res.status(404).json({
                msg: "No se encontro email en bd"
            });
            return;
        };

        const validPass = bcryptjs.compareSync(password, user.password)

        if(!validPass){
            res.status(404).json({
                msg: "La contraseña es incorrecta"
            });
            return;
        };

        //funcion en helpers/genJWT
        const token = await genJwt(user.id)

        res.status(200).json({
            user,
            token
        });


    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

};

export const verifyUser = async(req: Request, res: Response) =>{
    const {email, code} = req.body

    // Traer al usuario de la base
    try {
        const user = await UserModel.findOne({email})
        
        //posibles casos 
        if(!user){
            res.status(400).json({
                msg: "No se encontro el mail en la bd"
            });
            return
        }
        if(user.verified){
            res.status(400).json({
                msg: "El usuario esta correctamente verificado"
            });
            return
        }
        if(code !== user.verify_code){
            res.status(400).json({
                msg: "El codigo ingresado no es correcto"
            });
            return
        }
        //actualizar usario dentro de la base
        await UserModel.findOneAndUpdate(
            {email},
            {verified: true}
        )

        res.status(200).json({
           msg: "Usuario verificado con exito" 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}