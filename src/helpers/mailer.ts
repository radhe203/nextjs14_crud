import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/User"
export const sendEmail = async ({ email, emailType, userId }: any) => {


  try {
    const salt = await bcryptjs.genSalt(10)
    const hasedToken = await bcryptjs.hash(userId, salt)
    console.log(hasedToken)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { $set: { verifyToken: hasedToken, verifyTokenExpiry: Date.now() + 3600000 } })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { $set: { forgotPasswordToken: hasedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } })
    }

     

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e93f645aa51798",
        pass: "ba0b1558f89ecf"
      }
    });


    const mailOptions = {
      from: "radhe@bizax.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/verifyemail?verifyToken=${hasedToken}">here</a> to ${emailType === 'VERIFY' ? "verify your email " : "reset your password "}
      or copy and paste the link in your browser <br>
      ${process.env.NEXTAUTH_URL}/verifyemail?verifyToken=${hasedToken}
      </p>`
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse

  } catch (error: any) {
    console.log(error)
    // throw new Error(error.message)


  }
}