import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router";
import LogUtils from "../../../../libs/LogUtils";
import styles from './Style.module.css';
import {isNum, isNumDec, isNumDecTwoPlaces} from "../../../../libs/RegexUtils";
import csx from 'classnames';
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";
import {
    serviceAddHodFormDraft,
    serviceGetHodFormDetail,
    serviceGetHodFormDraft, serviceSaveHodReview
} from "../../../../services/PmsOverallHodReview.service";


const usePmsOverallHodForm = ({location}) => {
    const {id} = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rating, setRating] = useState({});

    const [columns, setColumns] = useState([
        {
            is_static: true,
            key: "employee",
            title: "Employee",
            fixed: true,
            readOnly: true,
            render: (all) => <div className={csx(styles.label21, (all?.is_eligible ? styles.greenBg : ''))}><span>{all.name}</span></div>
        },
        {
            is_static: true,
            key: "code",
            title: "Code",
            fixed: true,
            readOnly: true,
            render: (all) => <div className={csx(styles.label21, (all?.is_salary_maximized ? styles.redBg : ''))}><p>{all.code}</p></div>
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
            title: "DEPT.",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.department}</div>
        },
        {
            is_static: true,
            key: "department",
            title: "Sub Dept.",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all?.sub_department}</div>
        },
        {
            is_static: true,
            key: "experience",
            title: "Experience",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.experience}</div>
        },
        {
            is_static: true,
            key: "rating",
            title: "Hod Rating",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all?.rating} %</div>
        },
        {
            is_static: true,
            key: "rating",
            title: "Hod Recommendation",
            readOnly: true,
            render: (all) => <div className={styles.label}>{all?.is_recommended ? 'Yes' : 'No'}</div>
        },
        // {is_static: false, key: "city", title: "City" },
        // {is_static: false, key: "email", title: "Email" },
        // {is_static: false, key: "country", title: "Country" },
    ]);
    const [errors, setErrors] = useState({});
    const [rows, setRows] = useState([]);
    const [form, setForm] = useState({});
    const [draft, setDraft] = useState({});
    const [totalAvg, setTotalAvg] = useState(0);
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
        const tForm = {};
        const rating = {};
        rows.forEach((row, rowIndex) => {
            processedColumns.forEach((col, colIndex) => {
                if (!col.is_static) {
                    if (col.title !== 'HOD_RATING') {
                        tForm[`${row.id}_${col.key}`] = '';
                        if (row?.is_eligible === false) {
                            tForm[`${row.id}_${col.key}`] = 'NO';
                        }
                    } else {
                        tForm[`${row.id}_${col.key}`] = row?.rating;
                        rating[`${row.id}_${col.key}`] = row?.rating;
                    }
                }
            });
        });
        setForm(tForm);
        setRating(rating);
    }, [rows, processedColumns]);


    useEffect(() => {
        if (id && !isMount.current) {
            serviceGetHodFormDetail({batch_id: id}).then((res) => {
                if (!res.error) {
                    setRows([...res.data?.employees]);
                    setColumns([...columns, ...res?.data?.form]);
                    setTotalAvg(res?.data?.total_avg);
                    serviceGetHodFormDraft({batch_id: id}).then((res) => {
                        if (!res.error) {
                            if (res?.data && Object.keys(res?.data).length > 0) {
                                setDraft({ ...res?.data?.data});
                            }
                        }
                    });

                }
            });
            isMount.current = true;
        }
    }, [id]);


    useEffect(() => {
        if (form && draft) {
            const tForm = {...form};
            const tDraft = {...draft};
            Object.keys(tDraft).forEach((key) => {
                if (key in tForm) {
                    tForm[key] = tDraft[key];
                }
            });
            setForm({...tForm });
        }
    }, [draft]);

    const toggleStatusDialog = useCallback(() => {
        setApproveDialog((e) => !e);
      }, [approveDialog]);

    const checkValidation = useCallback(() => {
        const tErr = {...errors};
        Object.keys(form).forEach((key) => {
            if (!form[key]) {
                tErr[key] = true;
            } else if ( (key in rating) && ((parseFloat(rating[key]) - 8) > form[key] || (parseFloat(rating[key]) + 8) < form[key])) {
                tErr[key] = true;
            }
        });
        return tErr;
    }, [form, rating, errors]);


    const calculateAdjacentCells = useCallback((key) => {
        const arr = key.split('_');
        const row = parseInt(arr[0]);
        const cat = parseInt(arr[1]);
        const param = parseInt(arr[2]);
        let next = '';
        let prev = '';
        if (param === 0) {
            if (cat > 7) {
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
        return true;
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
    }, [form, errors, setErrors]);

    const removeError = useCallback(
        title => {
            const temp = JSON.parse(JSON.stringify(errors));
            delete temp[title];
            setErrors(temp);
        },
        [setErrors, errors],
    );


    const handleInputChange = useCallback((name, value, type, rating) => {
        const tForm = {...form};
        if ((!value || ((isNumDecTwoPlaces(value) && value > 0 && value <= 100) && type === 'NUMBER') )) { //((parseFloat(rating) - 5) <= value && (parseFloat(rating) + 5) >= value)
            tForm[name] = value;
            processChanges(name, value);
        }
        if (type === 'DROPDOWN') {
            tForm[name] = value;
            removeError(name);
        }
        setForm(tForm);
    }, [form, setForm, removeError]);

    const processData = useCallback(() => {
        const tRows = {...rows};
        const data = {};
        Object.keys(form).forEach(key => {
            const arr = key.split('_');
            const row = arr[0];
            // const rowIndex = tRows.findIndex(val => val.id === row);
            // const rowData = tRows[rowIndex];
            const empId = row;//rowData.id;

            const cat = arr[1];
            const param = arr[2];
            const val = form[key];


            if (!(empId in data)) {
                data[empId] = {};
            }
            data[empId] = {...data[empId], ...{[`${cat-9}_${param}`]: val}};
        });
        return data;
    }, [form, columns, rows]);

    const submitToServer = useCallback(() => {
        const data = processData();
        if (!isSubmitting) {
            setIsSubmitting(true);
            const data = processData();
            serviceAddHodFormDraft({
                batch_id: id,
                data: form
            });
            serviceSaveHodReview({
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
    }, [form, processData, setIsSubmitting, isSubmitting, id]);

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
                serviceAddHodFormDraft({
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
        submitToServer,
        totalAvg
    }
};

export default usePmsOverallHodForm;
