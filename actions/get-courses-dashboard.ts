import { prismadb } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course &{
    category: Category | null;
    chapters: {id:string} [];
    progress : number | null;
};


type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    courseInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourss = async(userId:string):Promise<DashboardCourses>=>{

    try {
        const purshadCourses  = await prismadb.purchase.findMany({
            where:{
                userId:userId
            },
            select:{
                course:{
                    include:{
                        category:true,
                        chapters:{
                            where:{
                                isPublished:true
                            }
                        }
                    }
                }
            }
        })


        const courses = purshadCourses.map((purchase)=>purchase.course) as CourseWithProgressWithCategory[];

        for(let course of courses){
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress
        }

        const completedCourses = courses.filter((course)=>course.progress===100);
        const courseInProgress = courses.filter((course)=> (course.progress ?? 0)<100);

        return{
            completedCourses, courseInProgress
        }
        
    } catch (error) {

        console.log("GetDashboardCourses", error)

        return{
            completedCourses: [],
             courseInProgress: []

        }
        
    }



}