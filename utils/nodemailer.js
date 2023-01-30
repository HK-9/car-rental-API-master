const nodemailer = require("nodemailer");

exports.sendOtp = async (email, otp) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.sendMail(
      {
        from: "hello@gmail.com",
        to: email,
        subject: "OTP Verification",
        text: "Verify your account ",
        html: `<p>Verify your Rentx account with this otp :<b>${otp}</b></p>`,
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
