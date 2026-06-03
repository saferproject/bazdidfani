import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function TextEditor({ data, setData, disabled }) {

    return (
        <div style={{ direction: 'rtl', width: "100%" }}>
            <CKEditor
                disabled={disabled}
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                    const content = editor.getData();
                    setData(content);
                }}
                config={{
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'link',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                            'insertTable',
                            // "imageUpload",
                            'undo',
                            'redo'
                        ]
                    },
                    language: 'fa',
                    placeholder: 'متن خود را بنویسید...'
                }}
            />
            {/* <div style={{ marginTop: '20px' }}>
                <strong>خروجی:</strong>
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </div> */}
        </div>
    );
}

export default TextEditor;