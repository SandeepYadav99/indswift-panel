import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimUpper from "./component/ClaimUpper/ClaimUpper";
import useCadreDetailsList from "./CadreDetails.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import MarrigeClaimForm from "./component/MarrigeClaimForm/MarrigeClaimForm.view";

function CadreDetails() {
  const { refMarrige, refCar, refMobile } = useCadreDetailsList({});
  return (
    <div className={styles.cadreDetailWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b> Entitlements Information</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpper />
      <MarrigeClaimForm ref={refMarrige} />
    </div>
  );
}

export default CadreDetails;
