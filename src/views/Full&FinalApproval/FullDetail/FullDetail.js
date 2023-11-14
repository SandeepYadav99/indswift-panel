import React from "react";
import useFullDetail from "./FullDetail.hook";
import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import PayData from "../../Full&Final/FinalDetail/compoent/PayData/PayData";
import FinalUpperCard from "../../Full&Final/FinalForm/component/FinalUpperCard/FinalUpperCard";
import FinalSalaryTable from "../../Full&Final/FinalForm/component/SalaryTable/FinalSalaryTable";

function FullDetail() {
  const { employeeDetail } = useFullDetail({});
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
          otherData={employeeDetail?.fullAndFinal}
        />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 1 : CTC of Employee</div>
        <FinalSalaryTable data={employeeDetail?.salary} />
      </div>
      <PayData employeeDetail={employeeDetail?.fullAndFinal} />
    </div>
  );
}

export default FullDetail;
