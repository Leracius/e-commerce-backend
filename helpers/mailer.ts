import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "axelbackend@gmail.com",
        pass: "bxsoeeltztlijmqg"
    },
    from: "axelbackend@gmail.com"
});

export const sendEmail = async(to: string, code: string): Promise<void> =>{
    
    const mailOptions = {
        from: "'Tech dev' axelbackend@gmail.com",
        to: to,
        subject: `tu codigo de verificacion para .techDev!`,
        text: `
            Copialo y pegalo! ${code}
        ` 
    };

    try {
        await transporter.sendMail(mailOptions)
        console.log("correo enviado");
    
    } catch (error) {
        console.error("Error al enviar el correo:", error);
            
    }
}