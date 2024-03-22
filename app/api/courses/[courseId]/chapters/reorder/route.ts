import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PUT(req:Request, {params} : {params :{courseId:string}}) {

    try {

        const {userId} = auth();

        const {list} = await req.json();

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

        for(let item of list){
            await prismadb.chapter.update({
                where:{id:item.id},
                data:{position:item.position}
            })
        }

        return new NextResponse("success", {status:200})

        
    } catch (error) {


        console.log("[REORDER]", error);
        return new NextResponse("Inital Error", {status:500})
        
        
    }
    




}

