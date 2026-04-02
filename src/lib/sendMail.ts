import nodeMailer from 'nodemailer'

const transporter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

export const  sendMAil = async (to:string,subject:string,html:string)=>{
    await transporter.sendMail({
        from:`"Rydex" <${process.env.EMAIL}>`, 
        to,
        subject,
        html
    })
}