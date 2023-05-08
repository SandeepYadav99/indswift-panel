import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {serviceGetPmsBatchDetail} from "../../../services/PmsReview.service";
import LogUtils from "../../../libs/LogUtils";
import styles from './Style.module.css';


const usePmsForm = ({}) => {
    const { id } = useParams();
    const [columns, setColumns] = useState([
        {is_static: true, key: "employee", title: "Employee", fixed: true,  readOnly: true, render: (all) => <div className={styles.label}>{all.name} <br/>{all.code}</div> },
        {is_static: true, key: "title", title: "Title", readOnly: true, render: (all) => <div className={styles.label}>{all.designation}</div> },
        {is_static: true, key: "location", title: "Location", readOnly: true, render: (all) => <div className={styles.label}>{all.location}</div> },
        {is_static: true, key: "department", title: "DEPT./Sub Dept", readOnly: true, render: (all) => <div className={styles.label}>{all.department}</div> },
        {is_static: true, key: "experience", title: "Experience", readOnly: true,  render: (all) => <div className={styles.label}>{all.experience}</div> },
        {is_static: false, key: "city", title: "City" },
        {is_static: false, key: "email", title: "Email" },
        {is_static: false, key: "country", title: "Country" },

    ]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        serviceGetPmsBatchDetail(id).then((res) => {
            if (!res.error) {
                LogUtils.log('res', res.data);
                setRows(res.data?.employees);
            }
        });
    }, [id]);


    const handleInputChange = (id, key, value) => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    return {
                        ...row,
                        [key]: value,
                    };
                }

                return row;
            })
        );
    };

    return {
        columns,
        handleInputChange,
        rows
    }
};

export default usePmsForm;
