import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req:Request, {params}: {params: {courseId : string}})
{

    try {

        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }


        const course= await prismadb.course.findUnique({
            where:{
                id:params.courseId,
                userId,
            },
            include:{
                chapters:{
                    include:{
                        muxData:true
                    }
                }
            }
        })

        if(!course){
            return new NextResponse("NOT FOUND", {status:404})

        }

        const hasPublischChapter = course.chapters.some((chapter)=>chapter.isPublished)


        if(!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublischChapter){
            return new NextResponse("Missing data field", {status:404})

        }

        const publishedCourse = await prismadb.course.update({
            where:{
                id:params.courseId,
                userId,
            },
            data:{
                isPublished:false
            }
        })


        return NextResponse.json(publishedCourse)


        
    } catch (error) {
        
        console.log("[COURSE_UNPUBLISH]", error);
        return new NextResponse("Inital Error", {status:500})
    }

}