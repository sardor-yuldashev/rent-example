import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try {
        const session = await getSession();

        if(!session?.user?.email){
            console.log("session or user or email is null ");
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
    
        });

        if(!currentUser){
            console.log("currentUser is null")
            return null;
        }

        return {
            ... currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };

    } catch (error: any){
        console.log("catch error");
        return null;
    }
}