import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';
import {ButtonBase} from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useClaimsDetail from "./ClaimsDetailHook";
import ClaimUpperCard from './components/ClaimUpperCard/ClaimUpperCard';
import ClaimBills from './components/ClaimBills/ClaimBills';

const ClaimsDetail = () => {
    const {  } = useClaimsDetail({});


    return (
        <div className={styles.claimsDetailWrapper}>
            <div className={styles.outerFlex}>
                <div>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'}/> <span className={'capitalize'}><b>Claim Details</b></span>
                    </ButtonBase>
                    <div className={styles.newLine}/>
                </div>
            </div>
            <ClaimUpperCard/>
            <ClaimBills/>
            <div className={styles.btnCont}>
                <ButtonBase  type={'button'} className={styles.createBtn}>UPDATE INFORMATION</ButtonBase>
            </div>
        </div>
    )
}

export default ClaimsDetail
