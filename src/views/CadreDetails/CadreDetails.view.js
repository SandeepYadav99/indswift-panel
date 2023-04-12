import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimUpper from "./component/ClaimUpper/ClaimUpper";
import useCadreDetailsList from "./CadreDetails.hook";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import ClaimForm from "./component/ClaimForm/ClaimForm.view";

function CadreDetails() {
  const { refMarrige, refCar, refMobile, handleSubmit } = useCadreDetailsList({});
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
      <ClaimForm type={'MARRIAGE'} title={'Marriage Claim'} ref={refMarrige} />
        <div className={styles.btnCont}>
            <ButtonBase
                type={"button"}
                className={styles.createBtn}
                onClick={handleSubmit}
            >
                Save
            </ButtonBase>
        </div>
    </div>
  );
}

export default CadreDetails;
