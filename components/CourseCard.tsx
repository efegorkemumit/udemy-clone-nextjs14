import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Badge } from './ui/badge';

interface CourseCardProps{
    id:string;
    title:string;
    imageUrl:string;
    chaptersLength:number;
    price:number;
    progress : number | null;
    category: string
}

const CourseCard = ({chaptersLength,id,imageUrl,price,progress,title,category}:CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className='group hover:shadow-sm transition overflow-hidden p-4 h-full border rounded-xl border-purple-300 bg-purple-100'>
            <div className='relative w-full aspect-video rounded-lg overflow-hidden'>
                <Image
                fill
                className='object-cover'
                alt={title}
                src={imageUrl}
                />

            </div>

            <div className='flex flex-col pt-2'>
                <div className='text-lg md:text-base font-medium group-hover:text-purple-700 transition'>
                {title}
                </div>
                <p className=' text-sm mt-1'>
                   <Badge className='p-2 bg-purple-700 hover:bg-purple-700'>{category}</Badge> 
                </p>


            
            </div>
            <div className='my-3 flex  items-center gap-2'>

                <span>
                    {chaptersLength} {chaptersLength=== 1 ? "Chapter" : "Chapters"}
                </span>


            </div>
          {progress !== null ? (
            <div>
                a
            </div>

          )
          :(
            <p>
           {formatPrice(price)}
        </p>
            
          )
        
        }

            


        </div>
    
    
    </Link>
  )
}

export default CourseCard