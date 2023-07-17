import classNames from "classnames";
import styles from "../Style.module.css";
import React, {useCallback, useState} from "react";


const PercentageField = ({percentage, id, handleInputChange}) => {
    const [value, setValue] = useState(percentage);

    const handleValueChange = useCallback((e) => {
        setValue(parseFloat(e?.target?.value));
        handleInputChange(id, 'final_percentage', e?.target?.value);
    }, [setValue, handleInputChange]);

    return (
        <input onChange={handleValueChange}
               type={'number'}
               className={classNames(styles.InputWrap, percentage != value ? styles.InputWrapChanged : '')}  value={value} />
    );
};

export default PercentageField;
