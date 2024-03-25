'use client'

import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Chapter } from '@prisma/client';
import { Edit, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChapterListProps{
    items:Chapter[];
    onReoder: (updateData:{id:string, position : number}[])=>void;
    onEdit:(id:string)=>void

}

const ChapterList = ({items,onEdit,onReoder}:ChapterListProps) => {

    const [isMounted, setIsMounted]= useState(false);
    const [chapters, setChapters]= useState(false);

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    useEffect(()=>{
        setChapters(items)
    }, [items])


    if(!isMounted){
        return null;
    }

    const onDragEnd = (result : DropResult)=>{

        if(!result.destination) return;
        

        const items = Array.from(chapters)

        const [reorderItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapter = items.slice(startIndex, endIndex +1 );

        setChapters(items)


        const bulkUpdateData = updatedChapter.map((chapter)=>({
            id:chapter.id,
            position: items.findIndex((item)=>item.id === chapter.id)
        }))

        onReoder(bulkUpdateData);


    }








  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="chapters">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='space-y-4'
        >
          {chapters.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='bg-slate-400'
                 
                >


<div className={cn("flex items-center justify-center gap-x-2 bg-slate-200 mb-3 text-sm border-slate-200",
item.isPublished && "bg-purple-200")}>

                        <div className='px-2 py-3 border-r-slate-400 border-r hover:bg-slate-300'><Grid className='h-5 w-5 mr-2'/></div>
                    <div> {item.title}</div>
                    <div className='ml-auto flex items-center'> 

                    <div>
                    {item.isFree &&(
                       <Badge className='p-2 bg-green-500 text-black'>
                       Free
                   </Badge>

                    )}

                       

                        <Badge className={cn("p-2 bg-slate-300 text-black",
                        item.isPublished && "bg-purple-500 text-white")}>

                            {item.isPublished ? "Published" : "Draft"}
                        </Badge>
                    </div>



                    <Button   onClick={()=>onEdit(item.id)}
                    
                    variant="link">

                    <Edit className='h-5 w-5'  
                          
                        />


                    </Button>
                       
                    
                    </div>
               
                </div>
                



                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  )
}

export default ChapterList