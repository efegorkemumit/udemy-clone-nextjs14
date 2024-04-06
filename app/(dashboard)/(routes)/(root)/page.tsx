import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton, auth } from "@clerk/nextjs";
import InfoCard from "../../_components/infoCard";
import { redirect } from "next/navigation";
import { getDashboardCourss } from "@/actions/get-courses-dashboard";
import CourseList from "@/components/CourseList";

export default async function Home() {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {completedCourses, courseInProgress} = await getDashboardCourss(userId)


  return (
    <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <InfoCard
          label="InProgress"
          numberOfItem={courseInProgress.length}
          />

        <InfoCard
          label="Competed"
          numberOfItem={completedCourses.length}
          />

       



        </div>

        <CourseList
          items={[...courseInProgress, ...completedCourses]}
          />


    </div>
  );
}
