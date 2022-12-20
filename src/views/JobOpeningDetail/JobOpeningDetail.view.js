import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';
import {ButtonBase} from "@material-ui/core";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import classnames from "classnames";
import CandidatesRecordTable from "./components/CandidatesTable/CandidatesTable.component";


const JobOpeningDetail = () => {

    return (
        <div>

            <div className={styles.outerFlex}>
                <div>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'}/> <span><b>Job Openings</b></span>
                    </ButtonBase>
                    <div className={styles.newLine}/>
                </div>
            </div>

            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.editFlex}>
                        <div className={styles.heading}>RAP Information</div>

                        <div className={styles.editBtn}>
                            <ButtonBase className={styles.edit}>EDIT</ButtonBase>
                        </div>
                    </div>


                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Location:</span>Nabha</div>
                            <div className={styles.key}><span className={styles.value}>Department:</span>GMS/HR&A</div>
                            <div className={styles.key}><span className={styles.value}>Sub-Department:</span>HR</div>
                            <div className={styles.key}><span className={styles.value}>Designation:</span>Sr. Manager</div>
                            <div className={styles.key}><span className={styles.value}>Grade:</span>G1</div>
                            <div className={styles.key}><span className={styles.value}>Cadre:</span>P1</div>
                            <div className={styles.key}><span className={styles.value} style={{width:'190px'}}>Status:</span> <span  className={classnames('status','success')}>ACTIVE</span></div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            <div className={styles.key}><span className={styles.value}>RAP ID:</span>ISLL/HR/ABC</div>
                            <div className={styles.key}><span className={styles.value}>Vacancy Type:</span>RAP</div>
                            <div className={styles.key}><span className={styles.value}>Replacing Employee ID:</span>121321</div>
                            <div className={styles.key}><span className={styles.value}>Replacing Employee Name:</span>Aman Rastogi</div>
                            <div className={styles.key}><span className={styles.value}>RAP Date:</span>02/06/2022</div>
                            <div className={styles.key}><span className={styles.value}>Assigned To:</span>Bhavna</div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.plainPaper}>
                <div className={styles.btmFlex}>
                    <div style={{flex:'1'}}>
                        <div className={styles.heading}>Candidates List</div>
                        <CandidatesRecordTable/>
                    </div>
                    <div style={{marginLeft:'20px'}}>
                        <ButtonBase className={styles.createBtn}>
                            Add Candidate
                        </ButtonBase>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default JobOpeningDetail
