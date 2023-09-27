import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { KURDFERGA_NODEMAILER_PASSWORD, KURDFERGA_ACCOUNT } = process.env;

let code = "";

const sendCode = async (email) => {
  let verifyCode = generateRandomString();
  code = verifyCode;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: KURDFERGA_ACCOUNT,
      pass: KURDFERGA_NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: KURDFERGA_ACCOUNT,
    to: email,
    subject: "کۆدی دڵنیابوونەوە",
    html: `
        <div>
          <h1>کۆدی دڵنیابوونەوە</h1>
          <p>ئەم کۆدە داغڵ بکە بۆ ئەوەی هەژمارەکەت دڵنیایبکرێتەوە لە وێبسایتی کوردفێرگە بۆ ئەکاونتەکەی خۆت</p>
          <p>کۆد: ${verifyCode}</p>
        </div>
    `,
  };

  if (!email) throw new Error("ئیمێڵ required");
  try {
    await transporter.sendMail(mailOptions);
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendForgetPasswordCodeMail = async (email) => {
  let verifyCode = generateRandomString();
  code = verifyCode;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: KURDFERGA_ACCOUNT,
      pass: KURDFERGA_NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: KURDFERGA_ACCOUNT,
    to: email,
    subject: `گۆڕانکاری لە ووشەی نهێنی`,
    html: `
    <div>
      <h1>کۆدی گۆڕانکاری ووشەی نهێنی</h1>
      <p>ئەم کۆدە بەکاربێنە بۆ گۆڕانکاری لە ووشەی نهێنیەکەت</p>
      <p>کۆد: ${verifyCode}</p>
    </div>
`,
  };

  if (!email) throw new Error("ئیمێڵ required");
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVerifyCode = () => {
  return code;
};

const generateRandomString = () => {
  let string = "";
  let random = "0123456789";
  for (let i = 0; i < 6; i++) string += random[Math.floor(Math.random() * 6)];
  return string;
};

export { sendCode, sendForgetPasswordCodeMail, getVerifyCode };
