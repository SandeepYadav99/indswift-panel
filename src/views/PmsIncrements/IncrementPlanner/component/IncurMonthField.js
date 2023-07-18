import classNames from "classnames";
import styles from "../Style.module.css";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {isNumDecTwoPlaces} from "../../../../libs/RegexUtils";
import LogUtils from "../../../../libs/LogUtils";
import useDebounce from "../../../../hooks/DebounceHook";


const IncrMonthField = ({incrValue, id, handleInputChange}) => {
    const [value, setValue] = useState(incrValue);
    const codeDebouncer = useDebounce(value, 500);
    const mount = useRef(false);

    useEffect(() => {
        if (codeDebouncer && mount.current) {
            handleInputChange && handleInputChange(id, 'incr_due_month', value);
        }
        mount.current = true;
    }, [codeDebouncer])

    const handleValueChange = useCallback((e) => {
        const val = e?.target?.value;
        if (!val || isNumDecTwoPlaces(val) && val <= 12) {
            setValue(parseFloat(e?.target?.value));
        }
    }, [setValue, handleInputChange]);

    return (
        <input onChange={handleValueChange}
               title={'Incr Month'}
               type={'number'}
               className={classNames(styles.InputWrap)}  value={value} />
    );
};

export default IncrMonthField;
