import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Style.module.css';
import {ButtonBase} from "@material-ui/core";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IncludeForm from "../LocationCreate/components/includes/Includes.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import QuickHeadDialog from "./components/Head/HeadDialog.view";

const LocationDetail = () => {
    const [isHeadDialog, setIsHeadDialog] = useState(false);

    const toggleHeadDialog = useCallback((data) => {
        setIsHeadDialog(e => !e);
    }, [setIsHeadDialog]);

    const _renderInfo = () => {
        if(true){
            return (
                <div className={styles.key}>
                    <span className={styles.value}>Location Head Details:</span>
                    <ButtonBase className={styles.addBtn} onClick={toggleHeadDialog}>+ Add Head</ButtonBase>
                </div>
            )
        } else {
            return (
                <div className={styles.left}>
                    <div className={styles.key}><span className={styles.value}>Employee Name:</span>Aman</div>
                    <div className={styles.key}><span className={styles.value}>Employee Code:</span>10012</div>
                    <div className={styles.key}><span className={styles.value}>Phone:</span>849584598</div>
                    <div className={styles.key}><span className={styles.value}>Email:</span>aman@indswift.in</div>
                </div>
            )
        }
    }

    return (
        <div>

            <div className={styles.outerFlex}>
                <div>
                    <ButtonBase onClick={() => (history.goBack())}>
                        <ArrowBackIosIcon fontSize={'small'}/> <span><b>Nabha Location</b></span>
                    </ButtonBase>
                    <div className={styles.newLine}/>
                </div>
            </div>

            <div className={styles.plainPaper}>
                <div className={styles.newContainer}>
                    <div className={styles.editFlex}>
                        <div className={styles.heading}>Location Information</div>

                        <div className={styles.editBtn}>
                            <ButtonBase className={styles.edit}>EDIT</ButtonBase>
                        </div>
                    </div>


                    <div className={styles.mainFlex}>
                        <div className={styles.left}>
                            <div className={styles.key}><span className={styles.value}>Location:</span>Nabha</div>
                            <div className={styles.key}><span className={styles.value}>Location Code:</span>NABHA</div>
                            <div className={styles.key}><span className={styles.value}>Address:</span>Derabassi - Barwala Rd, Bhagwanpur, Behra, Punjab 140507</div>
                            <div className={styles.key}><span className={styles.value}>City:</span>Behra</div>
                            <div className={styles.key}><span className={styles.value}>State:</span>Punjab</div>
                            <div className={styles.key}><span className={styles.value}>Pincode:</span>140507</div>
                        </div>
                        <div className={styles.vertical}>

                        </div>
                        <div className={styles.right}>
                            {_renderInfo()}
                        </div>
                    </div>

                    <div className={styles.statusFlex}>
                        <div className={'formFlex'} style={{alignItems:'center'}}>
                            <div className={'formGroup'} >
                                Status:
                            </div>
                            <div className={'formGroup'}>
                                <CustomSwitch
                                    // value={form?.is_active}
                                    // handleChange={() => {
                                    //     changeTextData(!form?.is_active, 'is_active')
                                    // }}
                                    label={`Active`}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.plainPaper}>
                <IncludeForm
                    // ref={includeRef}
                    // updateInventory={handleInventoryUpdate}
                />
            </div>

            <div className={styles.btnCont}>
                <ButtonBase  type={'button'} className={styles.createBtn}>UPDATE INFORMATION</ButtonBase>
            </div>

            <QuickHeadDialog isOpen={isHeadDialog} handleToggle={toggleHeadDialog}/>
        </div>
    )
}

export default LocationDetail
