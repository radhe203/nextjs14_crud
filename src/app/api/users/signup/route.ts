import { sendEmail } from "@/helpers/mailer"
import User from "@/models/User"
import { NextResponse,NextRequest } from "next/server"
import bcryptjs from "bcryptjs"
import connect from "@/dbConfig/dbConfig"
connect()
export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, password, email } = reqBody

        //validation
        console.log(reqBody)

        const user = await User.findOne({ email })

        if (user) return NextResponse.json({ message: "User already exists", status: 400 })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await new User({ username, email, password: hashedPassword })

        const savedUser = await newUser.save()


        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id.toString() })

        return NextResponse.json({ message: "User registered successfully" })


    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message, status: 500 })
    }
}
