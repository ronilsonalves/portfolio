"use server";

import { revalidatePath } from 'next/cache';
import { Resend } from "resend";

const config = {
    contactEmail: process.env.CONTACT_MAIL_TO,
    resendApiKey: process.env.RESEND_API_KEY,
    resendEmailFrom: process.env.RESEND_MAIL_FROM,
}

const resendClient = new Resend(config.resendApiKey);

export default async function sendContactMsg(prevState: any, formData: FormData) {
    const name = formData.get('fullName');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    try {
        await resendClient.emails.send({
            from: `${config.resendEmailFrom}`,
            to: [`${name} <${email}>`],
            subject: "Thank you for contacting me!",
            text: `Hi ${name},\n\nThank you for contacting me. I will get back to you as soon as possible.\n\nBest,\n\nRonilson`,
            html: `<p>Hi ${name},</p><p>Thank you for contacting me. I will get back to you as soon as possible.</p><p>Best,</p><p>Ronilson</p>`
        });

        // send email to myself
        await resendClient.emails.send({
            from: `${config.resendEmailFrom}`,
            to: [`${config.contactEmail}`],
            reply_to: `${name} <${email}>`,
            subject: subject?.toString()!,
            text: `You have a new message from ${name} <${email}>:\n\n${message}`,
            html: `<p>You have a new message from ${name} <${email}>:</p><p>${message}</p>`
        });

        revalidatePath("/about", "page")
        revalidatePath("/pt/about", "layout")
        return {
            status: 200,
            message: "Message sent successfully!"
        }
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            message: "Message not sent!"
        }
    }
}