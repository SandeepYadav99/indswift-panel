import React from "react";
import DesUpperCard from "./component/DesUpperCard/UpperCard";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../libs/history.utils";
import useSuccessionDetail from "./SuccessionDetail.hook";

function SuccessionPlanDetail() {
  const { employeeDetails } = useSuccessionDetail({});
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
      <DesUpperCard employeeDetail={employeeDetails} />
    </div>
  );
}

export default SuccessionPlanDetail;
