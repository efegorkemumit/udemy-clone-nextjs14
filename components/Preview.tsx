'use client'

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface PreviewProps {
    value: string
}

const Preview = ({ value }: PreviewProps) => {
    const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

    const modules = {
        toolbar: false // Toolbar'u devre dışı bırakır
    };

    return (
        <ReactQuill value={value} modules={modules} readOnly />
    )
}

export default Preview;
