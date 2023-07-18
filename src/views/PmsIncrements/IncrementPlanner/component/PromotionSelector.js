import csx from "classnames";
import styles from "../../../Pms/PMSHodForm/component/FormDropdown/Style.module.css";
import React, {useCallback, useEffect, useState} from "react";
import LogUtils from "../../../../libs/LogUtils";


const PromotionSelector = ({isPromoted, handleInputChange, id }) => {
    const [value, setValue] = useState(isPromoted ? 'YES' : 'NO');

    const onChange = useCallback((e) => {
        setValue(e?.target?.value);
        handleInputChange && handleInputChange(id, 'overall_hod_is_recommended', value);
    }, [setValue, handleInputChange]);

    return (
        <select className={csx(styles.inputComp)} value={value} onChange={onChange}>
            {/*<option value="">Choose Value</option>*/}
            <option value="YES">Yes</option>
            <option value="NO">No</option>
        </select>
    );
};

export default PromotionSelector;
