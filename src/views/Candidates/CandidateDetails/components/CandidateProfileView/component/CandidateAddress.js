import React from 'react';
import styles from "./Style.module.css"

const CandidateAddressInfo = ({address}) => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Permanent Address </div>

                    <div className={styles.mainFlex} style={{flexDirection:'column'}}>
                        <div className={styles.left}>
                            <div className={styles.key}>
                                {/* H.No 890, First Floor,<br/>
                                Sector 77B,<br/>
                                Chandigarh,<br/>
                                160079 */}
                                {address?.permanent_address}
                            </div>
                        </div>
                        <div className={styles.horizontal}>
                        </div>
                        <div className={styles.right}>

                           <div>
                               <div className={styles.heading}>Correspondence Address </div>

                               <div className={styles.key}>
                                   {/* H.No 890, First Floor,<br/>
                                   Sector 77B,<br/>
                                   Chandigarh,<br/>
                                   160079 */}
                                   {address?.correspondence_address}
                               </div>
                           </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CandidateAddressInfo
