/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React, {useCallback, useState} from 'react';
import {
    TextField,
    ButtonBase, InputAdornment, MenuItem, IconButton,
} from '@material-ui/core';
import styles from './style.module.css';
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";


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

const IncludeFields = ({index, changeData, employees, handlePress, data, errors, onBlur}) => {

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        changeData(index, {[name]: value});
    }

    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.flex1}>
                    <CustomAutoComplete
                        autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                        dataset={employees}
                        datasetKey={'label'}
                        onTextChange={(text, value) => { changeData(index, {interviewer: text}) }}
                        variant={'outlined'}
                        label={'Interviewer Name'}
                        name={'interviewer'}
                        isError={errors?.interviewer}
                        value={data?.interviewer}
                    />
                </div>

                <div className={styles.firstRow}>

                    <div className={styles.flex1}>
                        <TextField
                            error={errors?.step}
                            onChange={handleChange}
                            value={data?.step}
                            fullWidth={true}
                            type={'number'}
                            name={'step'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Interviewer Step Sequence'}
                        />
                    </div>
                </div>
                <div className={styles.bottomContainer}>
                    {index > 0 ? (<div className={'textCenter'}>
                        <ButtonBase
                            className={styles.removeBtn}
                            // label={this.props.index == 0 ? "+" : '-'}
                            onClick={() => {
                                handlePress(index == 0 ? "-" : '-', index);
                            }}
                        >
                            {index == 0 ? "Remove" : "Remove" }
                        </ButtonBase>
                    </div>) : (<div/>)}
                    <CustomCheckbox color={'primary'} handleChange={() => {changeData(index, {is_shortlist_approval: !data?.is_shortlist_approval})}} label={'Shortlist Approval'} checked={data?.is_shortlist_approval} />
                </div>

            </div>
        </div>
    );
};

export default (IncludeFields);
