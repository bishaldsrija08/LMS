import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";
import { Session } from "inspector/promises";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ], 
    
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async  signIn({user}) : Promise<boolean> {
            try {
                await dbConnect()
            const existingUser =  await User.findOne({email: user.email}) //findone returns object
            if(!existingUser){
                await User.create({
                    username: user.name,
                    email:user.email,
                    profileImage:user.image
                })
            }
            return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
       async session(session:Session, user:any){
          const  data = await User.findById(user.id)
            session.user.role = data.role  || "student"
            return session
        }
    }
}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}