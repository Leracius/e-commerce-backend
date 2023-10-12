import jwt from "jsonwebtoken"

//con esta funcion envio un id y devuelvo un token con el usuario de la abse perteneciente a ese id
//con una expiracion o en caso de que existe un error el mensaje de error

export const genJwt = (id: string = ""): Promise<string> =>{
    return new Promise((res, rej)=>{
        const payload = {id}


        jwt.sign(
            payload,
            process.env.SECRET_PASS as string,
            {
                expiresIn: "4h"
            },
            (err: Error | null, token: string | undefined)=>{
                if(err){
                    console.log(err);
                    rej("Token not generated")
                } else {
                    res(token as string)
                }
            }
        )
    })
}