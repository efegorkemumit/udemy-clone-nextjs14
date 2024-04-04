import { prismadb } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";


interface GetChapterProps {
    userId: string; 
    courseId: string; 
    chapterId: string; 
  };

export const getChapter = async ({
    userId, 
    courseId, 
    chapterId, 
  }: GetChapterProps) => {

    try {
        console.log("[GET_CHAPTER] Starting...");
        const purchase = await prismadb.purchase.findFirst({
          where: {
            userId,
            courseId
          }
        });
        console.log("[GET_CHAPTER] Purchase found:", purchase);

        const course = await prismadb.course.findUnique({
            where: {
              isPublished: true, 
              id: courseId,
            },
            select: {
              price: true, 
            }
          });
          console.log("[GET_CHAPTER] Course found:", course);

        const chapter = await prismadb.chapter.findUnique({
            where: {
              id: chapterId,
              isPublished: true,
            }
          });
          console.log("[GET_CHAPTER] Chapter found:", chapter);

        if (!chapter || !course) {
            throw new Error("Not found course");
        }

        let muxData = null; // MUX verisi
        let attachments: Attachment[] = []; // Ek dosyalar
        let nextChapter: Chapter | null = null; // Sonraki bölüm


        if (purchase) {
            attachments = await prismadb.attachment.findMany({
              where: {
                courseId: courseId
              }
            });
            console.log("[GET_CHAPTER] Attachments found:", attachments);
        }

        if(chapter.isFree || purchase){

            muxData = await prismadb.muxData.findUnique({
                where: {
                  chapterId: chapterId,
                }
              });
              console.log("[GET_CHAPTER] MuxData found:", muxData);


              nextChapter = await prismadb.chapter.findFirst({
                where: {
                  courseId: courseId,
                  isPublished: true, 
                  position: {
                    gt: chapter?.position, // Şu anki bölümün pozisyonundan sonraki bölümleri getir
                  }
                },
                orderBy: {
                  position: "asc", 
                }
              });
              console.log("[GET_CHAPTER] Next chapter found:", nextChapter);




        }


        const userProgress = await prismadb.userProgress.findFirst({
            where: {
              userId,
              chapterId
            }
          });
        console.log("[GET_CHAPTER] User progress found:", userProgress);

        console.log("[GET_CHAPTER] Returning data...");

        return {
            chapter, 
            course, 
            muxData, 
            attachments, 
            nextChapter,
            userProgress, 
            purchase, 
          };


        
    } catch (error) {
        console.error("[GET_CHAPTER] Error occurred:", error);

        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            purchase: null,
          };

        
    }





}