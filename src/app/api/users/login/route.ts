import connect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {  password, email } = reqBody

        //validation
        console.log(reqBody)

        const user = await User.findOne({ email })

        if (!user) return NextResponse.json({ message: "User does not exist", status: 400 })

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) return NextResponse.json({ message: "Wrong credentials", status: 400 })


        const tokenPayload = {
            userId: user._id,
            isVarified:user.isVarified,
            username: user.username,
            email: user.email
        }

    


        const token = jwt.sign(tokenPayload, process.env.SECRET as string, { expiresIn: "1d" })


        const response = NextResponse.json({ message: "Login successful", success:true })

        response.cookies.set("auth_token",token,{
            httpOnly:true,
            maxAge:60*60*24*1000
        })

        return response
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", status: 500 })
        console.log(error)
    }




}
