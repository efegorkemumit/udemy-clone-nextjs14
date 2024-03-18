import React from 'react'

interface CourseDetailProps{
    params:{
        courseId:string
    }
}

const CourseDetail = ({params}:CourseDetailProps) => {
  return (
    <div>
        {params.courseId}

    </div>
  )
}

export default CourseDetail