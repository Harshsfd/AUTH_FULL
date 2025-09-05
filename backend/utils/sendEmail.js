import nodemailer from 'nodemailer';

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) throw new Error('Email credentials missing');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"MERN Auth" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log(`📩 Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('❌ sendEmail error:', err.message);
    throw err;
  }
};

export default sendEmail;
