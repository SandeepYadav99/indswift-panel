import React from 'react';
import styles from "./Style.module.css"

const Timeline = () => {
    return (
        <div>
            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.heading}>Employee History</div>

                    <div>
                        <div className="step completeds">
                            <div className="v-stepper">
                                <div className="circle"></div>
                                <div className="line"></div>
                            </div>

                            <div className="content">
                                <strong className={styles.posted}>Joined As Intern</strong>
                                <div className={styles.posted} style={{marginTop: '5px'}}>07 Aug 2022</div>
                            </div>
                        </div>
                        <div className="step completeds">
                            <div className="v-stepper">
                                <div className="circle"></div>
                                <div className="line"></div>
                            </div>

                            <div className="content">
                                <strong className={styles.posted}>Joined As Intern</strong>
                                <div className={styles.posted} style={{marginTop: '5px'}}>07 Aug 2022</div>
                            </div>
                        </div>
                        {/*<div className="step active">*/}
                        {/*    <div className="v-stepper">*/}
                        {/*        <div className="circle"></div>*/}
                        {/*        <div className="line"></div>*/}
                        {/*    </div>*/}

                        {/*    <div className="content">*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timeline
