import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = (email, header, image, body) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_ACCOUNT,
      pass: process.env.MY_ACCOUNT_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MY_ACCOUNT,
    to: email,
    subject: "New blog from Ahmad Software Team",
    text: `There is a new blog you can see now in ahmad software team website, click here to visit the website   <a target="_blank" href="https://www.ahmad-software.com/blogs">

          </a>`,
    html: `
    <div >
      <h1>${header}</h1>
      <img src={URl.createObjectURL(${image})} alt="singleBlogImage" />
      <p >${body}</p>
    </div>
    `,
  };

  if (email === "") throw new Error("There is no email");
  else {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error(error.message);
      else console.log(email);
    });
  }
};

const sendFeedback = (email, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_ACCOUNT,
      pass: process.env.MY_ACCOUNT_PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.MY_ACCOUNT,
    subject: `Message from user ${email}`,
    text: message,
  };

  if (email === "") throw new Error("There is no email");
  else {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw new Error(error.message);
      else console.log(email);
    });
  }
};

export { sendEmail, sendFeedback };
