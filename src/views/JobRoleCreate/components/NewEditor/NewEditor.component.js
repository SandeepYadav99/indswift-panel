import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const NewEditor = ({editorData,handleChangeEditor,type, value}) => {
    console.log(editorData)
    const handleChange = (content) => {
        console.log(content);
        handleChangeEditor(type, content);//Get Content Inside Editor
    }

    return (
        <div>
            <SunEditor
                defaultValue={editorData}
                setOptions={{ height: 200,buttonList: [['bold','italic', 'underline', 'list',]] }}
                onChange={handleChange}/>
        </div>
    );
};
export default NewEditor;
