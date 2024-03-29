"use client"
 
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, EditIcon, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const columns: ColumnDef<Payment>[] = [
  
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },

    {
        accessorKey: "price",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
      },
   
      {
        accessorKey: "isPublished",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              isPublished
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell:({row})=>{
            const isPublished = row.getValue("isPublished") || false;

            return(
                <Badge className={cn("p-2", isPublished && "bg-purple-700")}>
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            )
        }
      },
    

    {
      id: "actions",
      cell: ({ row }) => {
        const {id} = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex items-center">

            <Link href={`/teacher/courses/${id}`}>
                <DropdownMenuItem>
                <EditIcon className="h-3 w-3 mr-2 "/> Edit
                </DropdownMenuItem>

            </Link>


          
             
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  

 