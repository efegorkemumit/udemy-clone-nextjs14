import { ourFileRouter } from '@/app/api/uploadthing/core';
import React from 'react'
import { toast } from './ui/use-toast';
import { UploadButton } from '@/lib/uploadthing';

interface FileUploadProps{
    onChange: (url?:string)=>void;
    endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({endpoint,onChange}:FileUploadProps) => {
  return (
    <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
         
        }}
        onUploadError={(error: Error) => {
            toast({
                title: "Something Went Wrong",
                description: error.message,
                variant:'destructive'
              })
        }}
      />
  )
}

export default FileUpload
