import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "./Style.module.css";
import { serviceGetReviewDetail} from "../../../services/PmsSiteReview.service";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";

const UsePmsFormDetail = ({}) => {
  const { id } = useParams();
  const [columns, setColumns] = useState([
    {
      is_static: true,
      key: "employee",
      title: "Employee",
      fixed: true,
      readOnly: true,
      render: (all) => ( <div className={styles.label21}><span>{all?.employee?.name}</span> <br/><p>{all?.employee?.code}</p></div>
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
      serviceGetReviewDetail(id).then((res) => {
        if (!res.error) {
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
      processedColumns.forEach((col) => {
        if (!col.is_static) {
          tForm[`${rowIndex}_${col.key}`] = "";
        }
      });
    });
    setForm(tForm);
  }, [rows, processedColumns]);
  const handleReviewPage = useCallback(() => {
    historyUtils.goBack()
    // historyUtils.push(RouteName.PERFORMANCE_REVIEW);
  }, []);
  return {
    columns,
    rows,
    processedColumns,
    form,
    handleReviewPage,
  };
};

export default UsePmsFormDetail;
