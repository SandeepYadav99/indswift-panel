import React, {useMemo} from 'react';
import styles from './Style.module.css';
import {getObjData} from "../../../../libs/general.utils";
import constants from "../../../../config/constants";

const Business = ({data}) => {

    return (
        <div>
            <div className={styles.plain}>
                <div className={styles.request}>Business Profile</div>
                <div className={styles.newFlex}>
                    <div>
                        <img src={data?.business_logo ? data.business_logo : require('../../../../assets/img/logo.png')} alt="" height={20}/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>{getObjData(data?.business_name)}</div>
                        <div className={styles.industry}>{data?.vendor_industry ? constants.INDUSTRY[data.vendor_industry] : 'N/A'}</div>
                        <div className={styles.mob}>{getObjData(data?.website)}</div>
                        <div className={styles.mob}>{getObjData(data?.address)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Business;
