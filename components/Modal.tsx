import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import React from "react"

  interface ConfirmModalProps{
    children:React.ReactNode,
    onConfirm: ()=>void
  }


const ConfirmModal = ({children,onConfirm}:ConfirmModalProps) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild >
      {children}
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you  sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. 
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ConfirmModal