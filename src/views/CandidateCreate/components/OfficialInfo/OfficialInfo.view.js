import React from 'react';
import styles from "./Style.module.css"
import {Search as SearchIcon} from "@material-ui/icons";
import cstyles from "../../../../components/Filter/Style.module.css";

const OfficialInfo = () => {
    return (
        <div>
            <div>
                <div className={styles.newContainer}>
                    <div className={cstyles.inputContainer}>
                        <input type="text" className={cstyles.searchInput} placeholder={'Search'}/>
                        <div className={'filterSearchIcon'}>
                            <SearchIcon fontSize={'medium'}/>
                        </div>
                    </div>
                    <br/>
                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>RAP ID:</span>ISLL/HR/ABC/KK</div>
                            <div className={styles.key}><span className={styles.value}>Type Of Vacancy:</span>RAP</div>
                            <div className={styles.key}><span className={styles.value}>Place of Posting:</span>Nabha</div>
                            <div className={styles.key}><span className={styles.value}>Candidate Grade:</span>G1</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>Department Applied For:</span>HR</div>
                            <div className={styles.key}><span className={styles.value}>Designation Applied For:</span>Manager</div>
                            <div className={styles.key}><span className={styles.value}>Associated HR</span>Bhavna</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OfficialInfo
