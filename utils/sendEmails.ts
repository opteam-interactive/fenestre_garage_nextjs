import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export async function sendEmail(email: string, name:string, html: string) {
   

    // create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    } as nodemailer.TransportOptions);

    //set up mail options
    const mailOptions: Mail.Options = {
        from: 'theo.harber@ethereal.email',
        to: 'theo.harber@ethereal.email',
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${name} (${email})`,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}