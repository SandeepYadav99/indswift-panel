import React from "react";
import FinalSalaryTable from "./component/SalaryTable/FinalSalaryTable";
import history from "../../../libs/history.utils";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase } from "@material-ui/core";
import FinalUpperCard from "./component/FinalUpperCard/FinalUpperCard";
import useFinalForm from "./FinalForm.hook";

function FinalForm() {
  const { employeeDetail } = useFinalForm({});
  const emp = {};
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
        <FinalUpperCard data={employeeDetail?.employee} />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 1 : CTC of Employee</div>
        <FinalSalaryTable data={employeeDetail?.salary} />
      </div>
    </div>
  );
}

export default FinalForm;
