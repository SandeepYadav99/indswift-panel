import React, {useEffect, useState, forwardRef, useImperativeHandle, useCallback, useMemo} from 'react';
import IncludeFields from './IncludeFields.component';
import styles from './style.module.css'
import {ButtonBase} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import LogUtils from "../../../../../libs/LogUtils";
import {serviceLocationDepartments} from "../../../../../services/Location.service";
import {WaitingComponent} from "../../../../../components/index.component";

const TEMP_OBJ = {
    department_id: '',
    employee: null,
};

const IncludeForm = ({data, employees, locationId, departments, errorData: errorForm, form, changeTextData, handleUpdate}, ref) => {
    const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    const [errorData, setErrorData] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
            serviceLocationDepartments({location_id: locationId}).then(res => {
                if (!res.error) {
                    const data = res?.data;
                    setFields(data.map(val => {
                        return {
                            department_id: val.department_id,
                            employee: val.employee,
                        };
                    }));
                }
                setIsFetching(false);
            });
    }, [locationId]);

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
        fields.forEach((val, index) => {
            const err = index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
            const required = ['employee', 'department_id'];
            required.forEach((key) => {
                if (!val[key]) {
                    err[key] = true;
                }
            });
            if (Object.keys(err).length > 0) {
                errors[index] = err;
            }
        });
        LogUtils.log('errors', errors);
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
        const oldState = JSON.parse(JSON.stringify(fields));
        if (type == 'ADDITION') {
            oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
        } else {
            if (oldState.length === 1) {
                return true;
            }
            oldState.splice(index, 1);
        }
        setFields(oldState);
        // validateData();
    }

    const renderFields = useMemo(() => {
        // const filteredDepartments = departments.filter(dept => {
        //     const index =  fields.findIndex(val => val?.department_id === dept?.id);
        //     return index < 0;
        // })
        if (isFetching) {return null};
        return fields.map((val, index) => {
            return (
                <div>
                    <IncludeFields
                        employees={employees}
                        departments={departments}
                        validateData={validateData}
                        errors={index in errorData ? errorData[index] : null}
                        changeData={changeData}
                        handlePress={handlePress}
                        data={val}
                        index={index}
                        onBlur={onBlur}
                    />
                </div>
            )
        });
    }, [employees, errorData, departments, validateData, changeData, handlePress, onBlur, fields, isFetching]);

    if (isFetching) {
        return (<WaitingComponent />);
    }

    return (
        <>
            <div className={'headerFlex'}>
                <h4 className={'infoTitle'}>
                    <div style={{fontSize: '0.8rem'}}>Location Departments</div>
                </h4>
            </div>
            {renderFields}
            <div>
                <ButtonBase
                    className={styles.addition}
                    label={"+"}
                    onClick={() => {
                        handlePress('ADDITION', 0)
                    }}
                >
                    <Add fontSize={"small"}/> <span>Department</span>
                </ButtonBase>
            </div>
        </>
    )
}

export default forwardRef(IncludeForm);
