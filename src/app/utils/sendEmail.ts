import nodemailer from 'nodemailer';

export const sendEmail = async (link: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'barishalzillaschool2008@gmail.com',
      pass: 'kubt vjfk dwnu oepj',
    },
  });

  // send mail
  await transporter.sendMail({
    from: 'barishalzillaschool2008@gmail.com',
    to: `${email}`,
    subject: 'Reset you password within 1 hour',
    text: 'Click the Link below to reset your password',
    html: link,
  });
};
