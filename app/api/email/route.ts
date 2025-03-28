import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    //Get info from request
    const { email, name, message } = await request.json();

    // create transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'theo.harber@ethereal.email',
            pass: 'mqj4PTQxh68sGaQwb1'
        }
    });

    //set up mail options
    const mailOptions: Mail.Options = {
        from: 'theo.harber@ethereal.email',
        to: 'theo.harber@ethereal.email',
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject: `Message from ${name} (${email})`,
        text: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return NextResponse.json({ message: 'Email sent' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}