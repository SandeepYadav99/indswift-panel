import React, {Component, useEffect, useMemo} from 'react';
import {Button, MenuItem,ButtonBase} from '@material-ui/core';
import styles from '../Style.module.css';
import {makeStyles} from "@material-ui/core/styles";
import useAnnualView from "./AnnualViewHook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";


const useStyle = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));

const AnnualView = ({selectedAnnuals, closeSidePanel, originWarehouseId,id}) => {
    const classes = useStyle();
    const { form, changeTextData, errorData, handleSubmit, onBlurHandler, removeError, warehouses,profileInfo } = useAnnualView({selectedAnnuals, closeSidePanel, originWarehouseId,id});
    
    
    return (
        <div>
            
            <div className={styles.upperInfo}>
                <div>{profileInfo?.fy_year}</div>
                <div>On Roll Employee</div>
            </div>

            <div>
                <div className={styles.loc}>{profileInfo?.location?.name}</div>
                <div className={styles.loc}>{profileInfo?.department?.name}</div>
                <div className={styles.hr} style={{marginTop:'10px'}}>{profileInfo?.sub_department?.name}</div>
            </div>

            <form onSubmit={handleSubmit}>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            type="number"
                            isError={errorData?.budget}
                            errorText={errorData?.budget}
                            label={'Approved Manpower Count'}
                            value={form?.budget}
                            onTextChange={text => {
                                changeTextData(text, 'budget');
                            }}
                            onBlur={() => {
                                onBlurHandler('budget');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            type="number"
                            isError={errorData?.posted}
                            errorText={errorData?.posted}
                            label={'Posted Manpower'}
                            value={form?.posted}
                            onTextChange={text => {
                                changeTextData(text, 'posted');
                            }}
                            onBlur={() => {
                                onBlurHandler('posted');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            type="number"
                            isError={errorData?.transferred}
                            errorText={errorData?.transferred}
                            label={'Transferred Manpower'}
                            value={form?.transferred}
                            onTextChange={text => {
                                changeTextData(text, 'transferred');
                            }}
                            onBlur={() => {
                                onBlurHandler('transferred');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            disabled={true}
                            type="number"
                            isError={errorData?.vacancies}
                            errorText={errorData?.vacancies}
                            label={'Vacancies'}
                            value={form?.vacancies}
                            onTextChange={text => {
                                changeTextData(text, 'vacancies');
                            }}
                            onBlur={() => {
                                onBlurHandler('vacancies');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            type="number"
                            isError={errorData?.expense_budget}
                            errorText={errorData?.expense_budget}
                            label={'Approved Budget'}
                            value={form?.expense_budget}
                            onTextChange={text => {
                                changeTextData(text, 'expense_budget');
                            }}
                            onBlur={() => {
                                onBlurHandler('expense_budget');
                            }}
                        />
                    </div>
                </div>

                <div className={styles.generate}>
                    <ButtonBase  type={'button'} onClick={handleSubmit} className={styles.createBtn}>
                       UPDATE INFORMATION
                    </ButtonBase>
                </div>
            </form>
        </div>
    )
}



export default AnnualView;
