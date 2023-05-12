import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "./Style.module.css";
import {serviceGetPmsBatchDetail, serviceGetReviewDetail} from "../../../services/PmsReview.service";

const UsePmsFormDetail = ({}) => {
  const { id } = useParams();
  const [columns, setColumns] = useState([
    {
      is_static: true,
      key: "employee",
      title: "Employee",
      fixed: true,
      readOnly: true,
      render: (all) => (
        <div className={styles.label}>
          {all?.employee?.name} <br />
          {all?.employee?.code}
        </div>
      ),
    },
    {
      is_static: true,
      key: "title",
      title: "Title",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all?.employee?.designation}</div>,
    },
    {
      is_static: true,
      key: "location",
      title: "Location",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all?.employee?.location}</div>,
    },
    {
      is_static: true,
      key: "department",
      title: "DEPT./Sub Dept",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all?.employee?.department}</div>,
    },
    {
      is_static: true,
      key: "experience",
      title: "Experience",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all?.employee?.experience}</div>,
    }
  ]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({});
  const isMount = useRef(false);

  const processedColumns = useMemo(() => {
    const cols = [];
    columns?.forEach((col, colIndex) => {
      if ("parameters" in col) {
        col.parameters.forEach((param, paramIndex) => {
          cols.push({
            ...param,
            key: `${colIndex}_${paramIndex}`,
            group: col.group,
            ratings:{...col.ratings}
          });
        });
      } else {
        cols.push(col);
      }
    });
    return cols;
  }, [columns]);

  useEffect(() => {
    if (!isMount.current) {
      serviceGetReviewDetail("6458e3fb7893b118a41074ca").then((res) => {
        if (!res.error) {
          // LogUtils.log('res', res.data);
          setRows(res.data?.reviews);
          setColumns([...columns, ...res?.data?.form_data]);
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
          tForm[`${rowIndex}_${col.key}`] = "";
        }
      });
    });
    setForm(tForm);
  }, [rows, processedColumns]);

  return {
    columns,
    rows,
    processedColumns,
    form,
  };
};

export default UsePmsFormDetail;
