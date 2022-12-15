import React, {Component, useEffect, useMemo} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch, IconButton, ButtonBase} from '@material-ui/core';
import styles from '../Style.module.css';
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import history from "../../../libs/history.utils"
import {makeStyles} from "@material-ui/core/styles";
import useAnnualView from "./AnnualViewHook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import LogUtils from "../../../libs/LogUtils";


const useStyle = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));

const AnnualView = ({selectedAnnuals, closeSidePanel, originWarehouseId}) => {
    const classes = useStyle();
    const { form, changeTextData, errorData, handleSubmit, onBlurHandler, removeError, warehouses, users } = useAnnualView({selectedAnnuals, closeSidePanel, originWarehouseId});


    const renderWarehouses = useMemo(() => {
        const menuItems = [];
        warehouses.forEach((warehouse) => {
            const isThere = selectedAnnuals.some(val => val.origin_warehouse_id === warehouse.id);
            if (!isThere) {
                menuItems.push(<MenuItem value={warehouse.id} key={warehouse.id}>{warehouse.title}</MenuItem>);
            }
        });
        return menuItems;
    }, [warehouses, selectedAnnuals]);

    return (
        <div>
            <div className={styles.headerFlex}>
                {/*<h4 className={styles.infoTitle}>*/}
                {/*    <div className={styles.heading}>Annual</div>*/}
                {/*    <Tooltip title="Info" aria-label="info" placement="right">*/}
                {/*        <InfoIcon fontSize={'small'}/>*/}
                {/*    </Tooltip>*/}
                {/*</h4>*/}
            </div>
            <div className={styles.upperInfo}>
                <div>FY 2022-23</div>
                <div>On Roll Employee</div>
            </div>

            <div>
                <div className={styles.loc}>Mohali Location</div>
                <div className={styles.hr}>Human Resources Department</div>
            </div>

            <form onSubmit={handleSubmit}>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            isError={errorData?.approved_count}
                            errorText={errorData?.approved_count}
                            label={'Approved Manpower Count'}
                            value={form?.approved_count}
                            onTextChange={text => {
                                changeTextData(text, 'approved_count');
                            }}
                            onBlur={() => {
                                onBlurHandler('approved_count');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            isError={errorData?.posted_manpower}
                            errorText={errorData?.posted_manpower}
                            label={'Posted Manpower'}
                            value={form?.posted_manpower}
                            onTextChange={text => {
                                changeTextData(text, 'posted_manpower');
                            }}
                            onBlur={() => {
                                onBlurHandler('posted_manpower');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
                            isError={errorData?.transferred_manpower}
                            errorText={errorData?.transferred_manpower}
                            label={'Transferred Manpower'}
                            value={form?.transferred_manpower}
                            onTextChange={text => {
                                changeTextData(text, 'transferred_manpower');
                            }}
                            onBlur={() => {
                                onBlurHandler('transferred_manpower');
                            }}
                        />
                    </div>
                </div>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <CustomTextField
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
                            isError={errorData?.approved_budget}
                            errorText={errorData?.approved_budget}
                            label={'Approved Budget'}
                            value={form?.approved_budget}
                            onTextChange={text => {
                                changeTextData(text, 'approved_budget');
                            }}
                            onBlur={() => {
                                onBlurHandler('approved_budget');
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
