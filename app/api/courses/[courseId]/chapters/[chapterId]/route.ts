import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from '@mux/mux-node';



const muxVideo = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});


export async function PATCH(req:Request, {params} :
     {params :{courseId:string, chapterId:string}}) {

        try {

                const {userId} = auth();

                const {isPublished, ...values} = await req.json();


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

                const chapter = await prismadb.chapter.update({
                    where:{
                        id:params.chapterId,
                        courseId:params.courseId
                    },
                    data:{
                        ...values
                    }
                });


               
                if(values.videoUrl){
                  console.log("[PATCH] Creating Mux asset with video URL:", values.videoUrl);
                  

                  const existingMuxData = await prismadb.muxData.findFirst({
                    where:{
                      chapterId:params.chapterId
                    }

                  })

                  if(existingMuxData){
                    try {
                      await muxVideo.video.assets.delete(existingMuxData.assetId);

                    } catch (error) {
                      
                    }
                    await prismadb.muxData.delete({
                      where:{
                        id:existingMuxData.id
                      }
                    })
                  }

                  const asset = await muxVideo.video.assets.create({
                    input_url: values.videoUrl,

                    playback_policy: ["public"],
                    encoding_tier: "smart" // Bu satırı smart olarak ayarlayabilirsiniz, istediğiniz encoding tier'a göre değiştirin
         

                  })

                  console.log("[PATCH] Mux asset created:", asset);

                  await prismadb.muxData.create({
                    data:{
                      chapterId:params.chapterId,
                      assetId:asset.id,
                      playbackId:asset.playback_ids?.[0]?.id,
                    }
                  })








                }


                return NextResponse.json(chapter)

        

            
        } catch (error) {

            console.log("[CHAPTERID]", error);
            return new NextResponse("Inital Error", {status:500})
            
        }




}


export async function DELETE(req:Request, {params} :
  {params :{courseId:string, chapterId:string}}) {

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

             const chapter = await prismadb.chapter.findUnique({
              where:{
                id:params.chapterId,
                courseId:params.courseId
              }
             })

             if(!chapter){
              return new NextResponse("Not found", {status:404})

              }



            
             if(chapter.videoUrl){
               

               const existingMuxData = await prismadb.muxData.findFirst({
                 where:{
                   chapterId:params.chapterId
                 }

               })

               if(existingMuxData){
                try {
                  await muxVideo.video.assets.delete(existingMuxData.assetId);

                } catch (error) {
                  
                }
                 await prismadb.muxData.delete({
                   where:{
                     id:existingMuxData.id
                   }
                 })
               }




             }


             const deletedChapter = await prismadb.chapter.delete({
              where:{
                id:params.chapterId
              }
             })

             const publishedChapter = await prismadb.chapter.findMany({
              where:{
                courseId:params.courseId,
                isPublished:true,
              }
             })

             if(!publishedChapter.length){
              await prismadb.course.update({
                where:{
                  id:params.courseId
                },
                data:{
                  isPublished:false
                }
              })


             }



             return NextResponse.json(deletedChapter)

     

         
     } catch (error) {

         console.log("[CHAPTERID]", error);
         return new NextResponse("Inital Error", {status:500})
         
     }




}

