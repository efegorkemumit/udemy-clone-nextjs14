import { prismadb } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";



type CourseWithProgressWithCategory = Course &{
    category: Category | null;
    chapters: {id:string} [];
    progress : number | null;
};

type GetCourses = {
    userId:string;
    title?:string;
    categoryId:string;
}

export const getCourses async(
    {userId, title, categoryId}:GetCourses): Promise<CourseWithProgressWithCategory[]>=>{


        try {

            const courses = await prismadb.course.findMany({
                where:{
                    isPublished:true,
                    title:{
                        contains:title,
                    },
                    categoryId,
                },
                include:{
                    category:true,
                    chapters:{
                        where:{
                            isPublished:true,
                        },
                        select:{
                            id:true,
                        },
                        
                    },
                    purchases:{
                        where:{
                            userId,
                        }
                    },
                    
                },
                orderBy:{
                    createdAt:"desc"
                }
            })


            const coursesWithProgress : CourseWithProgressWithCategory[] = await Promise.all(
                courses.map(async course=>{
                    if(course.purchases.length ===0){
                        return(
                            ...course,
                            progress:null
                        )
                    }

                    const progressPercent = await getProgress(userId, course.id);

                    return{
                        ...course,
                        progress:progressPercent
                    }
                })
            )

            return coursesWithProgress;
            
        } catch (error) {

            console.log("[GET_COURSES]", error);
            return [];

            
        }


}