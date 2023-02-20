import React, {useMemo} from 'react';
import styles from "./Style.module.css"
import {Search as SearchIcon} from "@material-ui/icons";
import cstyles from "../../../../../components/Filter/Style.module.css";

const OfficialInfo = ({ details, isStatic }) => {
    const vacancyChange=(value)=>{
        return value ? value.replace(/_/, " "): "NA"
      }
    const renderDetails = useMemo(() => {
        if (details) {
            return (
                <>
                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>PRC:</span>{details?.code}</div>
                            <div className={styles.key}><span className={styles.value}>Type Of Vacancy:</span>{vacancyChange(details?.vacancy_type)}</div>
                            <div className={styles.key}><span className={styles.value}>Place of Posting:</span>{details?.location?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Candidate Grade:</span>{details?.grade?.name}</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Department Applied For:</span>{details?.department?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Designation Applied For:</span>{details?.designation?.name}</div>
                            <div className={styles.key}><span className={styles.value}>Associated HR</span>{details?.assigned_person?.name}</div>
                        </div>
                    </div>
                </>
            )
        } else {
            return null;
        }
    }, [details]);
    return (
        <div>
            <div>
                <div className={styles.newContainer}>
                    {!isStatic && <div className={cstyles.inputContainer}>
                        <input type="text" className={cstyles.searchInput} placeholder={'Search'}/>
                        <div className={'filterSearchIcon'}>
                            <SearchIcon fontSize={'medium'}/>
                        </div>
                    </div>}
                    <br/>
                    {renderDetails}

                </div>
            </div>
        </div>
    )
}

export default OfficialInfo
