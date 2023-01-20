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
        changeData(index, {[name]: value});
    }

    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.flex1}>
                    <TextField
                        error={errors?.organisation_name}
                        onChange={handleChange}
                        value={data?.organisation_name}
                        fullWidth={true}
                        name={'organisation_name'}
                        margin={'dense'}
                        variant={'outlined'}
                        label={'Previous Organization'}
                    />
                </div>

                <div className={styles.firstRow}>

                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.duration}
                            onChange={handleChange}
                            value={data?.duration}
                            fullWidth={true}
                            type={'number'}
                            name={'duration'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Work Duration In Years'}
                        />
                    </div>

                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.designation}
                            onChange={handleChange}
                            value={data?.designation}
                            fullWidth={true}
                            name={'designation'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Previous Designation'}
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
