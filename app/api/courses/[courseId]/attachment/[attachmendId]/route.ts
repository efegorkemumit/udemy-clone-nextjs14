import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function DELETE(req:Request, {params} : {params :{courseId:string, attachmendId:string}}) {

    try {

        const {userId} = auth();

        
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        const courseOwner = await prismadb.course.findUnique({

            where: {
                id:params.courseId,
                userId:userId
            }


        })

        if(!courseOwner){
            return new NextResponse("Unauthorized", {status:401})

        }


        const attachment = await prismadb.attachment.delete({
            where:{
                courseId:params.courseId,
                id:params.attachmendId
            }
        })

        return NextResponse.json(attachment)

        
    } catch (error) {

        console.log("[ATTACHMENT_ID]", error);
        return new NextResponse("Inital Error", {status:500})
        
    }



}