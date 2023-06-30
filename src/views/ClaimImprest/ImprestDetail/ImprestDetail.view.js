import React from "react";
import useImprestDetailhook from "./ImprestDetail.hook";
import styles from "./Style.module.css";
import UpperClaimInfo from "../ImprestApprovalDetail/Component/UpperClaimInfo/UpperClaimInfo";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import ImprestDetailInfo from "./component/ImprestDetailInfo/ImprestDetailInfo";

function ImprestDetail() {
  const { id, employeeDetail } = useImprestDetailhook({});
  return (
    <div className={styles.claimListWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Imprest Request Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperClaimInfo data={employeeDetail} />
      <ImprestDetailInfo idCards={employeeDetail} />
    </div>
  );
}

export default ImprestDetail;
