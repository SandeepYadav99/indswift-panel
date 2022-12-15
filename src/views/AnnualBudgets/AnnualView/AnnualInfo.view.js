import React, {Component, useCallback, useEffect, useMemo, useState} from 'react';
import {serviceAnnualDetail} from "../../../services/Annual.service";
import {WaitingComponent} from "../../../components/index.component";
import Constants from "../../../config/constants";
import styles from "../Style.module.css";
import classnames from "classnames";


const AnnualInfo = ({awbId, closeSidePanel}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    }, [])


    if (isLoading) {
        return (<WaitingComponent/>);
    }

    return (
        <div>

            <div className={styles.upperInfo}>
                <div>FY 2022-23</div>
                <div>On Roll Employee</div>
            </div>

            <div>
                <div className={styles.loc}>Mohali Location</div>
                <div className={styles.hr}>Human Resources Department</div>
            </div>
            <br/>
            <div className={styles.plainPaper}>
                <div className={styles.topFlex}>
                    <div className={styles.approved}>Approved the Submitted Records</div>
                    <div className={classnames('status','warning')} style={{minWidth:"auto",fontSize:'0.7rem'}}>
                        SANCTIONED
                    </div>
                </div>

                <div className={styles.newInfo}>
                    <div><span className={styles.key}>Approved:</span>200</div>
                    <div><span className={styles.key}>Posted:</span>20</div>
                    <div><span className={styles.key}>Transferred:</span>02</div>
                    <div><span className={styles.key}>Vacancy:</span>02</div>
                    <div><span className={styles.key}>Approved Budget:</span>100,00,00</div>
                </div>

                <div className={styles.btmFlex}>
                    <div className={styles.user}>
                        <img src={require("../../../assets/img/download.png")} height={30} style={{marginRight:'10px'}}/>
                        <div><b>Sahil Munjal</b></div>
                    </div>
                    <div>
                        22/12/2022 11:00:00
                    </div>
                </div>
            </div>


        </div>
    )
}

export default AnnualInfo
