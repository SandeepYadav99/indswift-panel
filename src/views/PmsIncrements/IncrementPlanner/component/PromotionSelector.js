import csx from "classnames";
import styles from "../../../Pms/PMSHodForm/component/FormDropdown/Style.module.css";
import React, {useCallback, useEffect, useState} from "react";
import LogUtils from "../../../../libs/LogUtils";


const PromotionSelector = ({isPromoted, handleInputChange, id }) => {
    LogUtils.log('id', id, isPromoted, isPromoted ? 'YES' : 'NO');
    const [value, setValue] = useState(isPromoted ? 'YES' : 'NO');

    const onChange = useCallback((e) => {
        const val = e?.target?.value;
        setValue(val);
        handleInputChange && handleInputChange(id, 'is_promoted', val === 'YES');
    }, [setValue, handleInputChange]);

    return (
        <select className={csx(styles.inputComp)} value={value} onChange={onChange}>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
        </select>
    );
};

export default PromotionSelector;
