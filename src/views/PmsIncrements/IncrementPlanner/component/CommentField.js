import React, {useCallback, useState} from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";


const CommentField = ({id, value, handleInputChange}) => {
    const [comment, setComment] = useState(value);

    const handleValueChange = useCallback((e) => {
        setComment(e?.target?.value);
    }, [handleInputChange, setComment]);

    return (
        <CustomTextField
            value={comment}
            multiline
            rows={2}
            onChange={handleValueChange}
        />
    );
};

export default CommentField;
