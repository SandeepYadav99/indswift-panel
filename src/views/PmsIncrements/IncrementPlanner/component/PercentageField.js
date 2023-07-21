import classNames from "classnames";
import styles from "../Style.module.css";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {isNumDecTwoPlaces} from "../../../../libs/RegexUtils";
import LogUtils from "../../../../libs/LogUtils";
import useDebounce from "../../../../hooks/DebounceHook";


const PercentageField = ({percentage, finalPercentage, id, handleInputChange}) => {
    const [value, setValue] = useState(finalPercentage);
    const codeDebouncer = useDebounce(value, 500);
    const mount = useRef(false);

    useEffect(() => {
        if (codeDebouncer && mount.current) {
            handleInputChange && handleInputChange(id, 'final_percentage', value);
        }
        mount.current = true;
    }, [codeDebouncer])

    const handleValueChange = useCallback((e) => {
        const val = e?.target?.value;
        if (!val || isNumDecTwoPlaces(val) && val <= 100) {
            setValue(parseFloat(e?.target?.value));
        }
    }, [setValue, handleInputChange]);

    return (
        <input onChange={handleValueChange}
               title={percentage}
               type={'number'}
               className={classNames(styles.InputWrap, percentage != finalPercentage ? styles.InputWrapChanged : '')}  value={value} />
    );
};

export default PercentageField;
