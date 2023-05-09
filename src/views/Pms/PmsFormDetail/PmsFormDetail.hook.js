import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "./Style.module.css";
import { serviceGetPmsBatchDetail } from "../../../services/PmsReview.service";

const data = [
  {
    title: "JOB_KNOWLEDGE",
    weight: 1.25,
    group: "FARS",
    ratings: {
      rating: 8,
      weighted: 9,
      percentage: 78.32,
    },
    parameters: [
      {
        title: "JOB_KNOWLEDGE",
        description: "Consider",
        rating: 7.2,
      },
    ],
  },
  {
    title: "QUALITY_OF_WORK",
    weight: 1.25,
    group: "FARS",
    ratings: {
      rating: 5,
      weighted: 6.25,
      percentage: 78.32,
    },
    parameters: [
      {
        title: "QUALITY_OF_WORK",
        description: "Consider",
        rating: 3,
      },
    ],
  },
  {
    title: "HYGIENE_&_CLEANLINESS",
    weight: 1.25,
    group: "BARS",
    ratings: {
      rating: 5,
      weighted: 6.25,
      percentage: 78.32,
    },
    parameters: [
      {
        title: "HYGIENE_&_CLEANLINESS",
        description: "Consider",
        rating: 5,
      },
      {
        title: "HEALTH",
        description: "Consider",
        rating: 5,
      },
    ],
  },
  {
    title: "RECOMMEND_FOR_PROMOTION",
    weight: 0,
    group: "CPC",
    parameters: [
      {
        title: "RECOMMEND_FOR_PROMOTION",
        description: "Consider",
        rating: "YES",
      },
    ],
  },
];
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
          {all.name} <br />
          {all.code}
        </div>
      ),
    },
    {
      is_static: true,
      key: "title",
      title: "Title",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all.designation}</div>,
    },
    {
      is_static: true,
      key: "location",
      title: "Location",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all.location}</div>,
    },
    {
      is_static: true,
      key: "department",
      title: "DEPT./Sub Dept",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all.department}</div>,
    },
    {
      is_static: true,
      key: "experience",
      title: "Experience",
      readOnly: true,
      render: (all) => <div className={styles.label}>{all.experience}</div>,
    },
    ...data,
  ]);
  const [rows, setRows] = useState([...data]);
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
      serviceGetPmsBatchDetail("6459e1d065f95dd7b21a8d51").then((res) => {
        if (!res.error) {
          // LogUtils.log('res', res.data);
          setRows(res.data?.employees);
          // setColumns([...columns, ...res?.data?.form]);
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
