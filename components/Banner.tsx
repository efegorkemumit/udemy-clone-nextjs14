import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCheckIcon } from "lucide-react"


const bannerVariants = cva(
    "border text-center flex item-center w-full p-3 rounded-xl text-center justify-center",
    {
      variants: {
        variant: {
          warning:
            "bg-yellow-300 border-yellow-100 text-yellow-700",
          success: "bg-green-300 border-green-100 text-green-700",
  
        },
      },
      defaultVariants: {
        variant: "warning",
      },
    }
  )

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
        label:string
    }


const IconMap = {
    warning:AlertCircle,
    success: CheckCheckIcon,
}

const Banner = ({label,variant}:BannerProps) => {

    const Icon = IconMap[variant || "warning"]
  return (
    <div className="mb-11">
    <div className={cn(bannerVariants({variant}))}>
        <Icon className="h-5 w-5 mr-2"/>
        {label}


    </div>

    </div>
  )
}

export default Banner