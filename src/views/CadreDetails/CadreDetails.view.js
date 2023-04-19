import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import ClaimUpper from "./component/ClaimUpper/ClaimUpper";
import useCadreDetailsList from "./CadreDetails.hook";
import ClaimForm from "./component/ClaimForm/ClaimForm.view";

function CadreDetails() {
  const { refMarrige, refCar, refMobile, handleSubmit ,refHealth,employeeDetail} = useCadreDetailsList({})

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
      <ClaimUpper data={employeeDetail}/>
      <ClaimForm type={"MARRIAGE"} title={"Marriage Claim"} ref={refMarrige} />
      <ClaimForm type={"CAR"} title={"Car Claim"} ref={refCar} />
      <ClaimForm type={"MOBILE"} title={"Mobile Claim"} ref={refMobile} />
      <ClaimForm type={"HEALTH"} title={"Preventive Health Check-up Claim"} ref={refHealth} />

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
