import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transport: Mail;
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f39aa8366830c5',
        pass: 'd8c497b1bf927b',
      },
    });
  }

  sendEmail(destination: string, subject: string, link: string) {
    const message = {
      from: 'elonmusk@tesla.com',
      to: destination,
      subject,
      html: `<div>To reset your password click <a href="${link}">here!</a></div>`,
    };
    this.transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}
