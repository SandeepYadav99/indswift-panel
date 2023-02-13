/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, {useCallback, useState} from 'react';
import {
    TextField,
    ButtonBase, InputAdornment, MenuItem, IconButton,
} from '@material-ui/core';
import styles from './style.module.css';
import {isAlpha, isNum} from "../../../../../libs/RegexUtils";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import {AddCircle as AddIcon, Info as EditIcon, RemoveCircleOutline as RemoveIcon} from "@material-ui/icons";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../../../libs/LogUtils";


const useStyles = {
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: 'black',
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    }
};


const IncludeFields = ({index, changeData, employees, departments, handlePress, data, errors, onBlur}) => {

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'quantity') {
            LogUtils.log('maxQty', data);
            if (!value || (isNum(value) && data.maxQty >= value)) {
                changeData(index, {[name]: value});
            }
        } else if (name === 'price') {
            if (!value || isNum(value)) {
                changeData(index, {[name]: value});
            }
        } else {
            changeData(index, {[name]: value});
        }
    }
    const handleChangeValue = useCallback((value, key) => {
        changeData(index, {[key]: value});
    }, [changeData, index]);


    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.firstRow}>

                    <div className={styles.flex1}>
                        <CustomSelectField
                            fullWidth={true}
                            isError={errors?.department}
                            errorText={errors?.department}
                            label={'Department Name'}
                            // value={data?.department_id}
                            onChange={handleChange}
                        >
                            {departments.map(dept => {
                                return (<MenuItem key={dept.id} value={dept.id}>{dept.label}</MenuItem>);
                            })}
                        </CustomSelectField>
                    </div>

                    <div className={styles.flex1}>
                        <CustomAutoComplete
                            autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                            dataset={employees}
                            datasetKey={'label'}
                            onTextChange={(text, value) => { handleChangeValue(text, 'employee') }}
                            variant={'outlined'}
                            label={'Employee Name(Employee ID)'}
                            name={'sku'}
                            isError={errors?.employee}
                            value={data?.employee}
                        />
                        {/*<CustomInputAutocomplete*/}
                        {/*    options={variants}*/}
                        {/*    getOptionLabel={(option) => option.sku}*/}
                        {/*    onChange={(text, value) => { LogUtils.log('val', text, value); handleChangeValue(value, 'sku') }}*/}
                        {/*    value={data?.sku?.sku}*/}
                        {/*/>*/}
                    </div>
                    <div className={'textCenter'}>
                            <ButtonBase
                                className={styles.removeBtn}
                                // label={this.props.index == 0 ? "+" : '-'}
                                onClick={() => {
                                    handlePress(index == 0 ? "-" : '-', index);
                                }}
                            >
                                {index == 0 ? "Remove" : "Remove" }
                            </ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default (IncludeFields);
