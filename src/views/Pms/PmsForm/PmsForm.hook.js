import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router";
import {serviceGetPmsBatchDetail} from "../../../services/PmsReview.service";
import LogUtils from "../../../libs/LogUtils";
import styles from './Style.module.css';
import {isNum, isNumDec} from "../../../libs/RegexUtils";


const usePmsForm = ({}) => {
    const {id} = useParams();
    const [columns, setColumns] = useState([
        {
            is_static: true,
            key: "employee",
            title: "Employee",
            fixed: true,
            readOnly: true,
            render: (all) => <div className={styles.label}>{all.name} <br/>{all.code}</div>
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
            render: (all) => <div className={styles.label}>{all.department}</div>
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
                    LogUtils.log('res', res.data);
                    setRows(res.data?.employees);
                    setColumns([...columns, ...res?.data?.form]);
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
            prev = `${row}_${cat - 1}_${param}`
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
    }, [form]);

    const processChanges = useCallback((name, value) => {
        const {next, prev} = calculateAdjacentCells(name);
        const tErr = {...errors};
        if (form[next] == value || form[prev] == value) {
            tErr[name] = true;
        } else {
            delete tErr[name];
        }
        setErrors(tErr);
    }, [calculateAdjacentCells, form, errors, setErrors]);

    const handleInputChange = useCallback((name, value, type) => {
        const tForm = {...form};
        if (!value || (isNumDec(value) && value <= 10)) {
            tForm[name] = value;
            processChanges(name, value);
        }
        setForm(tForm);
    }, [form, setForm, processChanges]);

    const handleSubmit = useCallback(() => {
        const validationErr = checkValidation();
        if (Object.keys(validationErr).length > 0) {
            setErrors(validationErr);
        }
    }, [checkValidation, setErrors]);

    return {
        columns,
        handleInputChange,
        rows,
        processedColumns,
        form,
        errors,
        handleSubmit
    }
};

export default usePmsForm;
