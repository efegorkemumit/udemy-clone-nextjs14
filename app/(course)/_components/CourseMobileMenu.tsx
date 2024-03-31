import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Chapter, Course, UserProgress } from "@prisma/client"
import { Menu } from "lucide-react"
import CourseSidebar from "./CourseSidebar"

interface CourseNavbarProps{
    course: Course &{
        chapters : (Chapter &{
            userprogress : UserProgress[] |null
        })[];
    }
    progressCount:number;
}


const CourseMobileMenu = ({course,progressCount}:CourseNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
    <Menu/>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-64">

        <div>
           <CourseSidebar
           course={course}
           progressCount={progressCount}
           />
        </div>
  
      
   
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileMenu