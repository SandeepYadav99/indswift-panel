import React from "react";
import useTaxDetail from "./TaxDetail.hook";
import styles from "./Style.module.css";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { ButtonBase, IconButton, MenuItem } from "@material-ui/core";
import UpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimTaxCard/component/UpperCard/UpperCard";
import TaxData from "./component/TaxData/TaxData";


function TaxDetail() {
  const { employeeDetail } = useTaxDetail({});
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
        <UpperCard data={employeeDetail?.employee} />
      </div>
      <TaxData employeeDetail={employeeDetail?.taxRebate} />
    </div>
  );
}

export default TaxDetail;
