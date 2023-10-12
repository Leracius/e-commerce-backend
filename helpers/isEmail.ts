import UserModel, { UserInterface } from '../interfaces/userIF'

export const existEmail = async (email: string): Promise<void> =>{
    const existingEmail: UserInterface | null = await UserModel.findOne({email})
    
    if(existingEmail){
        throw new Error(`the email ${email} already exists`)
    }
}