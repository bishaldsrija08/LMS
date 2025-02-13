//check if incoming req/user is logged in also check if login
// role admin or not

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req:NextRequest)=>{
// check if logged on or not
const session =  await getServerSession(authOptions)

if(!session ||  session.user.role!==Role.Admin){
    return Response.json({
        message: "You don't have permisson  to perform this action."
    }, {
        status: 401
    }) 
}
return NextResponse.next()
}

export default authMiddleware