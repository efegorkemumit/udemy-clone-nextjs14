'use client'

import { useState } from "react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface EditorProps{
    onChange: (value:string)=>void;
    value:string
}


const Editor = ({onChange,value}:EditorProps) => {

  return (
    <ReactQuill value={value} onChange={onChange}/>

  )
}

export default Editor