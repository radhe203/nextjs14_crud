import connect from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { tokenData } from "@/helpers/tokenData";
connect()


export async function POST(request:NextRequest){
    const userId = await tokenData(request)
    const user =await  User.findOne({_id:userId}).select("-password")

    if(!user){
        return NextResponse.json({message:"User not found",status:400})
    }

    return NextResponse.json({
        message:"User found",
        data:user
    })
}