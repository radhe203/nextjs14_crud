import connect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        // const user2 = await User.findOneAndUpdate(
        //     { verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } },
        //     { 
        //         $unset: { verifyToken: "", verifyTokenExpiry: "" },
        //         $set: { isVerified: true }
        //     },
        //     { new: true } // This option returns the modified document
        // );

        const user = await User.findOneAndUpdate(
            {verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}},
            {
                $unset:{verifyToken:"",verifyTokenExpiry:""},
                $set:{isVarified:true}
            }
        )

        if (!user) return NextResponse.json({ message: "Invalid token", status: 400 })

        // await User.find    

        // user.verifyToken = undefined
        // user.verifyTokenExpiry = undefined
        // user.isVarified = true
        // await user.save()
        return NextResponse.json({ message: "User verified successfully", status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}