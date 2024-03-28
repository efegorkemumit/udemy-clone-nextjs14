import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const muxVideo = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
  });

export async function PATCH(req:Request, {params}: {params: {courseId : string}}) {

    try {

        const {userId} = auth();
        const { courseId} = params;
        const values = await req.json()

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        const course = await prismadb.course.update({
            where:{
                id:courseId,
                userId
            },
            data:{
                ...values
            }
        });

        return NextResponse.json(course);
        
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Inital Error", {status:500})
        
    }
    
}

export async function DELETE(req:Request, {params}: {params: {courseId : string}}) {

    try {

        const {userId} = auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }

        const course = await prismadb.course.findUnique({
            where:{
                id:params.courseId,
                userId
            },
            include:{
                chapters:{
                    include:{
                        muxData:true
                    }
                }
            }
        });

        if(!course){
            return new NextResponse("NOT FOUND", {status:404})

        }

        for(const chapter of course.chapters){
            if(chapter.muxData?.assetId){
                try {
                    await muxVideo.video.assets.delete(chapter.muxData.assetId);
  
                  } catch (error) {
                    
                  }
            }
        }

        const deletedCourse = await prismadb.course.delete({
            where:{
                id:params.courseId
            }
        })

        return NextResponse.json(deletedCourse);
        
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Inital Error", {status:500})
        
    }
    
}