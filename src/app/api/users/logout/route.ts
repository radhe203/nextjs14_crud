import { NextResponse, NextRequest } from "next/server";

export async function GET(request:NextRequest){
    try {
        const response = NextResponse.json({message:"Logout Succesfull", success:true})

        response.cookies.set("auth_token","",{
            httpOnly:true,
            maxAge:0,
            expires:new Date(0)
        })

        // response.cookies.delete("auth_token")

        return response
    } catch (error:any) {
        return NextResponse.json({message:error.message,status:500})
        console.log(error)
    }
}