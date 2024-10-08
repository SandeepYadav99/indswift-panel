import React, {useEffect, useState, forwardRef, useImperativeHandle, useCallback, useMemo} from 'react';
import {Button, ButtonBase, IconButton, MenuItem} from "@material-ui/core";
import LogUtils from "../../../../libs/LogUtils";
import {RemoveCircleOutline as RemoveIcon, AddCircle as AddIcon, Add} from "@material-ui/icons";
import {useParams} from "react-router";
import styles from "../../Style.module.css";
import IncludeQualificationField from './IncludeQualificationField';
import CustomTextField from '../../../../components/FormFields/TextField/TextField.component';
const TEMP_OBJ = {
    qualification: '',
    degree_name: '',
    institute_name: '',
    passing_year: '',
    cgpa: '',
    degree_type: '',
};

const IncludeQualification = ({data, currency, listWarehouse, errorData: errorForm, form, changeTextData, updateInventory, vendorId,isDisabled}, ref) => {
    const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    const [errorData, setErrorData] = useState({});
    const [variants, setVariants] = useState([]);
    const [otherCertificates, setOtherCertificates] = useState('');
    const {id} = useParams();

    useEffect(() => {

    }, []);

    useEffect(() => {
        let sku = 0;
        let qty = 0;
        fields.forEach((val) => {
            sku++;
            if (val.quantity && !isNaN(val.quantity)) {
                qty += parseInt(val.quantity);
            }
        });
        // updateInventory(sku, qty);
    }, [fields]);

    useImperativeHandle(ref, () => ({
        isValid() {
            return validateData();
        },
        setData(data, otherData) {
            setFields([...data]);
            if (otherData) {
                setOtherCertificates(otherData)
            }
        },
        resetData() {
             setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
        },
        getData() {
            return {
                fields: JSON.parse(JSON.stringify(fields)),
                otherCertificates: otherCertificates,
            };
        }
    }));

    const getState = () => {
        return fields;
    }

    const validateData = (index, type) => {
        const errors = {};

        fields.forEach((val, index) => {
            const err = index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
            const required = ['qualification', 'degree_name', 'institute_name', 'passing_year', 'cgpa', 'degree_type'];
            required.forEach((key) => {
                if (!val[key]) {
                    err[key] = true;
                }
            });
            if (val.name === null) {
                err.name = true;
            }
            if (Object.keys(err).length > 0) {
                errors[index] = err;
            }
        });
        setErrorData(errors);
        return !(Object.keys(errors).length > 0);
    }

    useEffect(() => {
        if (data) {
            setFields(data);
        }
    }, [data]);

    const isValid = () => {
        return validateData();
    }

    const checkExists = useCallback(async (index, key, value) => {

    }, []);
    const removeErrors = useCallback((index, key) => {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (errors[index] != undefined) {
            if (Array.isArray(key)) {
                key.forEach(k => {
                    delete errors[index][k];
                })
            } else {
                delete errors[index][key];
            }
            setErrorData(errors);
        }
    }, [setErrorData, errorData]);


    const changeData = (index, data) => {
        const tempData = JSON.parse(JSON.stringify(fields));
        tempData[index] = {...tempData[index], ...data};
        LogUtils.log('data', data);
        setFields(tempData);
        const errArr = [];
        Object.keys(data).forEach((key) => {
            errArr.push(key);
        });
        removeErrors(index, errArr);
    }

    const onBlur = useCallback((index, key, value) => {
        if (key === 'vendor_code' || key === 'ean') {
            if (value) {
                // checkExists(index, key, value);
            }
        }
    }, [checkExists]);

    const handlePress = async (type, index = 0) => {
        LogUtils.log('type', type, index);
        const oldState = JSON.parse(JSON.stringify(fields));
        if (type == 'ADDITION') {
            oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
        } else {
            if (oldState.length === 1) {
                return true;
            }
            oldState.splice(index, 1);
        }
        LogUtils.log('oldState', oldState);
        setFields(oldState);
        // validateData();
    }

    const renderFields = useMemo(() => {
        return fields.map((val, index) => {
            const tempFilters = variants.filter(variant => {
                const index =  fields.findIndex(val => val?.sku?.sku === variant?.sku);
                return index < 0;
            })
            return (
                <div>
                <IncludeQualificationField variants={tempFilters}
                                isDisabled={isDisabled}
                               listWarehouse={listWarehouse}
                               currency={currency}
                               validateData={validateData}
                               errors={index in errorData ? errorData[index] : null}
                               changeData={changeData} handlePress={handlePress} data={val} index={index} onBlur={onBlur}/>
                </div>
            )
        });
    }, [variants, errorData, listWarehouse, currency, validateData, changeData, handlePress, onBlur, fields]);

    return (
        <>
            {renderFields}

            { !isDisabled && <div>
                <ButtonBase
                    className={styles.addition}
                    label={"+"}
                    onClick={() => {
                        handlePress('ADDITION', 0)
                    }}
                >
                    <Add fontSize={"small"}/> <span>Add Qualification</span>
                </ButtonBase>
            </div>}
            <div className={styles.firstRow} style={{marginTop:'15px'}}>
                <div className={styles.flex1}>
                    <CustomTextField
                        disabled={isDisabled ? true : false}
                        label={"Other Professional Certificates (if any)"}
                        value={otherCertificates}
                        onTextChange={(text) => {
                            setOtherCertificates(text);
                        }}
                    />
                </div>
                </div>
            {/*</div>*/}
        </>
    )
}

export default forwardRef(IncludeQualification);
