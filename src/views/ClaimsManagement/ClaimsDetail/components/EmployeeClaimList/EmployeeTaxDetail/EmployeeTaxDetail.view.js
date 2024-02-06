import React from "react";
import styles from "./Style.module.css";
import history from "../../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase } from "@material-ui/core";
import TaxData from "../../../../../Tax/Detail/component/TaxData/TaxData";
import UpperCard from "../../ClaimTaxCard/component/UpperCard/UpperCard";
import useEmployeeTaxDetail from "./EmployeeTaxDetail.hook";

function EmployeeTaxDetail() {
  const { employeeDetail, id } = useEmployeeTaxDetail({});
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Tax Rebate Claim Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <UpperCard
          data={employeeDetail?.employee}
        />
      </div>
      <TaxData employeeDetail={employeeDetail} />
    </div>
  );
}

export default EmployeeTaxDetail;
