
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


const EmployeeIncludeFields = ({index, changeData, variants, handlePress, data, errors, onBlur, currency, listWarehouse}) => {
    const [isProductDialog, setIsProductDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedVariantId, setSelectedVariantId] = useState(null);

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
        if (key === 'sku') {
            changeData(index, {quantity: '', [key]: value, 'maxQty': value.quantity, 'price': value.variant_price});
        } else {
            changeData(index, {[key]: value});
        }
    }, [changeData, index]);

    const handleIsFeatured = (e) => {
        changeData(index, { [e.target.name]: !data.is_included } );
    }

    const handleServiceChange = (e) => {
        const { value } = e.target;
    }

    const toggleProductDialog = useCallback(() => {
        setIsProductDialog(e => !e);
        setSelectedProductId(data?.sku?.product_id);
        setSelectedVariantId(data?.sku?.variant_id)
    }, [setIsProductDialog, setSelectedProductId, data]);

    return (
        <div>
            <div className={styles.flexContainer}>
                <div className={styles.flex1}>
                    <TextField
                        error={errors?.organization}
                        onChange={handleChange}
                        value={data?.organization}
                        fullWidth={true}
                        name={'organization'}
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

export default (EmployeeIncludeFields);
