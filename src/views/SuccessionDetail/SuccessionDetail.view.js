import React from "react";
import DesUpperCard from "./component/DesUpperCard/UpperCard";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../libs/history.utils";

function SuccessionPlanDetail() {
  const employeeDetail = {};
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Succession Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <DesUpperCard employeeDetail={employeeDetail} />
    </div>
  );
}

export default SuccessionPlanDetail;
