import { getChapter } from '@/actions/get_chapters';
import VideoPlayer from '@/app/(course)/_components/VideoPlayer';
import Banner from '@/components/Banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

interface ChapterPageIDProps{
    params:{
        courseId:string;
        chapterId:string;
    }
}

const ChapterPageID = async({params}:ChapterPageIDProps) => {

    const { userId } = auth();

    if (!userId) {
      return redirect("/");

    } 


    const {
        chapter, 
        course, 
        muxData, 
        attachments, 
        nextChapter,
        userProgress, 
        purchase, 
    } = await getChapter({
        userId,
        chapterId:params.chapterId,
        courseId:params.courseId
    })


    if(!chapter || !course){
        return redirect("/");

    }

    const isLocked = !chapter.isFree && !purchase;
    const CompleteOneEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
        {userProgress?.isCompleted&&(
            <Banner
            variant="success"
            label='You are sucess completed'
            >
            </Banner>
        )}

        {isLocked &&(
            <Banner
            variant="warning"
            label='You need to sell to course'
            >
            </Banner>
        )}

        <div className='flex flex-col mx-auto pb-10 2xl:max-w-[1300px] 2xl:mx-0'>
            <div className='p-3'>

                <VideoPlayer
                chapterId={params.chapterId}
                completeOnEnd={CompleteOneEnd}
                courseId={params.courseId}
                isLocked={isLocked}
                playbackId={muxData?.playbackId}
                title={chapter.title}
                nextChapterId={nextChapter?.id}
                
                />



            </div>



        </div>




    </div>
  )
}

export default ChapterPageID