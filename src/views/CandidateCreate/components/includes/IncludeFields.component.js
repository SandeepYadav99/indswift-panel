/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, {useCallback, useState} from 'react';
import {
    TextField,
    ButtonBase, InputAdornment, MenuItem, IconButton,
} from '@material-ui/core';
import styles from './style.module.css';
import {isAlpha, isNum} from "../../../../libs/RegexUtils";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import {AddCircle as AddIcon, Info as EditIcon, RemoveCircleOutline as RemoveIcon} from "@material-ui/icons";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import LogUtils from "../../../../libs/LogUtils";


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

const IncludeFields = ({index, changeData, variants, handlePress, data, errors, onBlur, currency, listWarehouse}) => {

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


    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.firstRow}>

                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.degree}
                            onChange={handleChange}
                            value={data?.degree}
                            fullWidth={true}
                            name={'degree'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Degree Name'}
                        />
                    </div>

                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.marks}
                            onChange={handleChange}
                            value={data?.marks}
                            fullWidth={true}
                            type={'number'}
                            name={'marks'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Degree Marks'}
                        />
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
