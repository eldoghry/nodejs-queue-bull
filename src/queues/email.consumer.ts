import { Job } from "bull";
import nodemailer from "nodemailer";

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.SMTP_HOST,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // do not fail on invalid certs
  },
});

const emailProcess = async (job: Job) => {
  //   console.log(job.attemptsMade);
  //   job.progress(10);
  //   await sleep(1000);
  job.log(`processing job #${job.id} attempt: ${job.attemptsMade}`);
  //   if (job.attemptsMade < 2) throw new Error("Email failed to send");
  //   job.progress(30);
  //   await sleep(3000);
  //   console.log(job.data);
  //   job.progress(60);
  //   await sleep(3000);
  //   job.progress(100);

  //   sending email
  const { to, subject, text } = job.data;
  try {
    job.progress(30);
    const result = await transporter.sendMail({
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });

    job.progress(100);
    job.log(`email send successfully`);
    return result.response;
  } catch (error: any) {
    job.moveToFailed(error, true);
    console.log(error);
  }
};

export { emailProcess };
