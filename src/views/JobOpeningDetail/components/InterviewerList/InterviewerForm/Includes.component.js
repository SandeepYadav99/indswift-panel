/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */
import React, {useEffect, useState, forwardRef, useImperativeHandle, useCallback, useMemo} from 'react';
import IncludeFields from './IncludeFields.component';
import styles from './style.module.css'
import {Button, ButtonBase, IconButton, MenuItem} from "@material-ui/core";
import LogUtils from "../../../../../libs/LogUtils";
import {Add} from "@material-ui/icons";
import {useParams} from "react-router";
import {serviceGetList} from "../../../../../services/Common.service";
import {useSelector} from "react-redux";
import WaitingComponent from "../../../../../components/Waiting.component";

const TEMP_OBJ = {
    interviewer: '',
    step: '',
    is_shortlist_approval: false
};

const IncludeForm = ({data, errorData: errorForm, form, changeTextData}, ref) => {
    const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    const [errorData, setErrorData] = useState({});
    const [employees, setEmployees] = useState([]);
    const {id} = useParams();
    const {isInterviewerFetching, interviewers } = useSelector(state => state.job_opening_detail);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        setIsFetching(true);
        serviceGetList(['EMPLOYEES']).then((res) => {
            if (!res.error) {
                const data = res?.data?.EMPLOYEES;
                setEmployees(data);
                const temp = [];
                interviewers.forEach(interview => {
                   const index = data.findIndex(val => val.id === interview.id);
                   if (index >=0 ) {
                       temp.push({
                           interviewer: data[index],
                           step: interview?.step,
                           is_shortlist_approval: interview?.is_shortlist_approval,
                       });
                   }
                });
                setFields(temp);
            }
            setIsFetching(false);
        });
    }, [interviewers]);

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
        resetData() {
             setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
        },
        getData() {
            return JSON.parse(JSON.stringify(fields));
        }
    }));

    const getState = () => {
        return fields;
    }

    const validateData = (index, type) => {
        const errors = {};
        // if (type) {
        //     if (errorData[index]) {
        //         errorData[index][type] = false;
        //     }
        //     setErrorData(errorData);
        //     return false;
        // }
        fields.forEach((val, index) => {
            const err = index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
            const required = [
                'interviewer',
                'step'
            ];
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
            const tempFilters = employees.filter(employee => {
                const index =  fields.findIndex(val => val?.interviewer?.id === employee?.id);
                return index < 0;
            })
            return (
                <div>
                <IncludeFields employees={tempFilters}
                               validateData={validateData}
                               errors={index in errorData ? errorData[index] : null}
                               changeData={changeData} handlePress={handlePress} data={val} index={index} onBlur={onBlur}/>
                </div>
            )
        });
    }, [employees, errorData, validateData, changeData, handlePress, onBlur, fields]);

    if(isFetching) {
        return (<WaitingComponent />);
    }

    return (
        <>
            {renderFields}
            <div>
                <ButtonBase
                    className={styles.addition}
                    label={"+"}
                    onClick={() => {
                        handlePress('ADDITION', 0)
                    }}
                >
                    <Add fontSize={"small"}/> <span>Add Interviewer</span>
                </ButtonBase>
            </div>
            {/*</div>*/}
        </>
    )
}

export default forwardRef(IncludeForm);
