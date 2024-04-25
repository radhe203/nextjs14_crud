import Jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function tokenData(request: NextRequest) {

    
    const token = request.cookies.get("auth_token")?.value || ""
    console.log(token)
    if (token === ""){
        NextResponse.json({ message: "something went wrong", status: 500 })
        return
    } 
    const data: any = Jwt.verify(token, process.env.SECRET!)
    console.log(data)
    return data.userId

}