const nodemailer = require('nodemailer')

exports.sendOtp = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'pvharikrishna8120@gmail.com',
                pass: "lzvqpxixztmvxdup",
            },
        })

        transporter.sendMail({
            from: "hello@gmail.com",
            to: email,
            subject: 'verify your account',
            text: 'verify your account ',
            html: `<p>verify your account with this otp :<b>${otp}</b></p>`
        }, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        })


    } catch (error) {
        console.log(error)
    }
}
