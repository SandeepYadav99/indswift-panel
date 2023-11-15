import React from "react";
import useFinalDetail from "./FinalDetail.hook";
import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import FinalUpperCard from "../FinalForm/component/FinalUpperCard/FinalUpperCard";
import FinalSalaryTable from "../FinalForm/component/SalaryTable/FinalSalaryTable";
import StatusPill from "../../../components/Status/StatusPill.component";
import PayData from "./compoent/PayData/PayData";

function FinalDetail() {
  const { employeeDetail } = useFinalDetail({});
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Full & Final Settlement Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <FinalUpperCard
          data={employeeDetail?.employee}
          otherData={employeeDetail}
        />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 1 : CTC of Employee</div>
        <FinalSalaryTable data={employeeDetail?.salary} />
      </div>
      <PayData employeeDetail={employeeDetail} />
    </div>
  );
}

export default FinalDetail;
