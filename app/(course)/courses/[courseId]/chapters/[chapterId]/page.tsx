import { getChapter } from '@/actions/get_chapters';
import VideoPlayer from '@/app/(course)/_components/VideoPlayer';
import CourseProgressButton from '@/app/(course)/_components/course-progress-button';
import CourseSellButton from '@/app/(course)/_components/course-sell-button';
import Banner from '@/components/Banner';
import Preview from '@/components/Preview';
import { auth } from '@clerk/nextjs';
import { File } from 'lucide-react';
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


            <div className='p-3 flex flex-col md:flex-row items-center justify-between'>
                <h2 className='text-3xl font-semibold text-purple-600 uppercase'>
                    {chapter.title}
                </h2>


              {purchase ? (
                <div>
                <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}

                />
                </div>
              ):
              (
                <CourseSellButton
                courseId={params.courseId}
                price={course.price}
                />

              )
              }




            </div>

            <div className='mt-5 lg:mt-10'>
            <Preview value={chapter.description}/>



            </div>

            {!!attachments.length &&(
                <>

                <div className='p-3'>
                    {attachments.map((attach)=>(
                        <a href={attach.url}
                        target='_blank'
                        key={attach.id}
                        className='flex items-center bg-purple-500 text-white text-xs rounded-sm mb-2 w-full'>

                            <File/>
                            <p>
                                {attach.name}
                            </p>


                        </a>
                    ))}


                </div>
                
                </>
            )}



        </div>




    </div>
  )
}

export default ChapterPageID