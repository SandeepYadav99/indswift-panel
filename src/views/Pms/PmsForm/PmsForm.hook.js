import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router";
import {
    serviceAddPMSDraft,
    serviceAddPMSReview,
    serviceGetPmsBatchDetail,
    serviceGetPMSDraft
} from "../../../services/PmsReview.service";
import LogUtils from "../../../libs/LogUtils";
import styles from './Style.module.css';
import {isNum, isNumDec} from "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";


const usePmsForm = ({location}) => {
    const {id} = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);

    const [columns, setColumns] = useState([
        {
            is_static: true,
            key: "employee",
            title: "Employee",
            fixed: true,
            readOnly: true,
            render: (all) => <div className={styles.label21}><span>{all.name}</span> <br/><p>{all.code}</p></div>
        },
        {
            is_static: true,
            key: "title",
            title: "Title",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.designation}</div>
        },
        {
            is_static: true,
            key: "location",
            title: "Location",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.location}</div>
        },
        {
            is_static: true,
            key: "department",
            title: "DEPT./Sub Dept",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.department}/{all?.sub_department}</div>
        },
        {
            is_static: true,
            key: "experience",
            title: "Experience",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.experience}</div>
        },
        // {is_static: false, key: "city", title: "City" },
        // {is_static: false, key: "email", title: "Email" },
        // {is_static: false, key: "country", title: "Country" },
    ]);
    const [errors, setErrors] = useState({});
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({});
    const isMount = useRef(false);


    const processedColumns = useMemo(() => {
        const cols = [];
        columns.forEach((col, colIndex) => {
            if ('parameters' in col) {
                col.parameters.forEach((param, paramIndex) => {
                    cols.push({
                        ...param,
                        key: `${colIndex}_${paramIndex}`,
                        group: col.group,
                    });
                });
            } else {
                cols.push(col);
            }
        });
        return cols;
    }, [columns]);

    useEffect(() => {
        if (!isMount.current && id) {
            serviceGetPmsBatchDetail(id).then((res) => {
                if (!res.error) {
                    setRows([...res.data?.employees]);
                    setColumns([...columns, ...res?.data?.form]);

                    serviceGetPMSDraft(id).then((res) => {
                        if (!res.error) {
                            if (res?.data && Object.keys(res?.data).length > 0) {
                                setForm({...form, ...res?.data?.data});
                            }
                        }
                    });

                }
            });
            isMount.current = true;
        }
    }, [id]);

    useEffect(() => {
        const tForm = {};
        rows.forEach((row, rowIndex) => {
            processedColumns.forEach((col, colIndex) => {
                if (!col.is_static) {
                    tForm[`${rowIndex}_${col.key}`] = '';
                }
            });
        });
        setForm(tForm);
    }, [rows, processedColumns]);


    const toggleStatusDialog = useCallback(() => {
        setApproveDialog((e) => !e);
      }, [approveDialog]);

    const checkValidation = useCallback(() => {
        const tErr = {...errors};
        Object.keys(form).forEach((key) => {
            if (!form[key]) {
                tErr[key] = true;
            }
        });
        return tErr;
    }, [form, errors]);

    const calculateAdjacentCells = useCallback((key) => {
        const arr = key.split('_');
        const row = parseInt(arr[0]);
        const cat = parseInt(arr[1]);
        const param = parseInt(arr[2]);
        let next = '';
        let prev = '';
        if (param === 0) {
            if (cat > 5) {
                const totalParam = columns[cat-1]?.parameters?.length;
                prev = `${row}_${cat - 1}_${totalParam-1}`
            } else {
                prev = `${row}_${cat - 1}_${param}`
            }
        } else {
            prev = `${row}_${cat}_${param - 1}`
        }
        const temp = `${row}_${cat}_${param + 1}`;
        if (!(temp in form)) {
            next = `${row}_${cat+1}_${0}`;
        } else {
            next = temp;
        }
        return {
            prev,
            next,
        };
    }, [form, columns]);

    const isAdjacentDiff = useCallback((value, refValue) => {
        if (value && refValue) {
            const diff = Math.abs(value - refValue);
            return diff > 0.5;
        } return true;
    }, []);

    const processChanges = useCallback((name, value) => {
        const {next, prev} = calculateAdjacentCells(name);
        const tErr = {...errors};
        if (!isAdjacentDiff(parseFloat(form[next]), parseFloat(value))  || !isAdjacentDiff(parseFloat(form[prev]), parseFloat(value))) {
            tErr[name] = 'same';
        } else {
            delete tErr[name];
        }
        setErrors(tErr);
    }, [calculateAdjacentCells, form, errors, setErrors]);

    const removeError = useCallback(
        title => {
            const temp = JSON.parse(JSON.stringify(errors));
            delete temp[title];
            setErrors(temp);
        },
        [setErrors, errors],
    );


    const handleInputChange = useCallback((name, value, type) => {
        const tForm = {...form};
        if ((!value || (isNumDec(value) && value > 0 && value <= 10)) && type === 'NUMBER') {
            tForm[name] = value;
            processChanges(name, value);
        }
        LogUtils.log('type', type, name, value);
        if (type === 'DROPDOWN') {
            tForm[name] = value;
            removeError(name);
        }
        setForm(tForm);
    }, [form, setForm, processChanges, removeError]);

    const processData = useCallback(() => {
        const tRows = {...rows};
        const data = {};
        Object.keys(form).forEach(key => {
            const arr = key.split('_');
            const row = arr[0];
            const rowData = tRows[row];
            const empId = rowData.id;

            const cat = arr[1];
            const param = arr[2];
            const val = form[key];


            if (!(empId in data)) {
                data[empId] = {};
            }
            data[empId] = {...data[empId], ...{[`${cat-5}_${param}`]: val}};
        });
        return data;
    }, [form, columns, rows]);

    const submitToServer = useCallback(() => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            const data = processData();
            serviceAddPMSDraft({
                batch_id: id,
                data: form
            });
            serviceAddPMSReview({
                batch_id: id,
                reviews: data,
            }).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Form Submitted Successfully');
                    historyUtils.goBack();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [form, id, processData, setIsSubmitting, isSubmitting]);

    const handleSubmit = useCallback(() => {
        const validationErr = checkValidation();
        LogUtils.log('validationb err', validationErr);
        if (Object.keys(validationErr).length > 0) {
            setErrors(validationErr);
            return true;
        }
        LogUtils.log('submit to server');
        toggleStatusDialog()
        // submitToServer()
    }, [checkValidation, setErrors, submitToServer]);

    const handleDraft = useCallback(() => {
        const err = {...errors};
        let isAdjacentErr = false;
        Object.keys(err).forEach((key) => {
            if (err[key] == 'same') {
                isAdjacentErr = true;
                return true;
            }
        });
        if (!isAdjacentErr) {
            if (!isSubmitting) {
                setIsSubmitting(true);
                serviceAddPMSDraft({
                    batch_id: id,
                    data: form
                }).then((res) => {
                    if (!res.error) {
                        SnackbarUtils.success('Draft Saved Successfully');
                        historyUtils.goBack();
                    } else {
                        SnackbarUtils.error(res?.message);
                    }
                    setIsSubmitting(false);
                });
            }
        } else {
            SnackbarUtils.error('Please resolve error for same value');
        }
    }, [setIsSubmitting, isSubmitting, id, form, errors]);

    return {
        columns,
        handleInputChange,
        rows,
        processedColumns,
        form,
        errors,
        handleSubmit,
        isSubmitting,
        handleDraft,
        toggleStatusDialog,
        approveDialog,
        submitToServer
    }
};

export default usePmsForm;
