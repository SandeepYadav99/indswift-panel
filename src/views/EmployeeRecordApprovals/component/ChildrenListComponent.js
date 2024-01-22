import React, { useMemo } from "react";
import styles from "./Style.module.css";
import csx from "classnames";

const ChildrenListComponent = ({ data }) => {

  const table = useMemo(() => {

    return data.map((val) => {
        
      return (
        <div className={csx(styles.flex, styles.tableFlex)}>
          <div className={styles.tableText}>
            <b>Name</b>: {val?.name}
          </div>
          <div className={styles.tableText}>
            <b>DOB</b>: {val?.dob ? val?.dob : "-"}
          </div>
          <div className={styles.tableText}>
            <b>Gender</b>: {val?.gender}
          </div>
        </div>
      );
    });

  }, [data]);

  return <div>{table}</div>;
};

export default ChildrenListComponent;
