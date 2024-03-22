import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req:Request, {params} : {params :{courseId:string}}) {



    try {

        const {userId} = auth();
        const {title} = await req.json();

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

        const lastChapter = await prismadb.chapter.findFirst({
            where:{
                courseId:params.courseId
            },
            orderBy:{
                position:"desc"
            }
        });

        const  newPositon = lastChapter ? lastChapter.position+1 : 1;

        const chapter = await prismadb.chapter.create({
            data:{
                title,
                courseId:params.courseId,
                position:newPositon
            }


        })

        return NextResponse.json(chapter)
        
    } catch (error) {

        console.log("[CHAPTER]", error);
        return new NextResponse("Inital Error", {status:500})
        
        
    }
}
