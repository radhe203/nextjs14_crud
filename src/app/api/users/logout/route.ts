import { NextResponse, NextRequest } from "next/server";

export async function POST(request:NextRequest){
    try {
        // const response = NextResponse.json({message:"Logout Succesfull"})

        // response.cookies.set("auth_token","",{
        //     httpOnly:true,
        //     maxAge:0,
        //     expires:new Date(0)
        // })

        // response.cookies.delete("auth_token")
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response;
    } catch (error:any) {
        return NextResponse.json({message:error.message,status:500})
        console.log(error)
    }
}