import React, {useCallback} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const NewEditor = ({editorData, handleChange, type, value,optionList=[], ...rest}) => {
    const handleChangeCallback = (content) => {
        handleChange && handleChange(content);
    };

    return (
        <div>
            <SunEditor
                defaultValue={editorData}
                
                setOptions={{ height: 200,
                     buttonList: [
                        ['bold','italic', 'underline', 'list',...optionList]
                    ] 
                      ,}}
                onChange={(text) => {
                    handleChangeCallback(text)
                }}
                {...rest}
            />
        </div>
    );
};
export default NewEditor;
