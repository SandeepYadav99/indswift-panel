import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useClaimsDetail from "./ClaimsDetailHook";
import ClaimCards from "./components/ClaimCards/ClaimCards";
import EmployeeClaimList from "./components/EmployeeClaimList/EmployeeClaimList.container";

const ClaimsDetail = () => {
  const { handleClaimPage, data } = useClaimsDetail({});
  return (
    <div className={styles.claimsDetailWrapper}>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Claim Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.claimContainer}>
        {data?.marriage_gift_claim?.is_show && (
          <ClaimCards
            title="Marriage Gift Card Claim"
            subtitle="Claim the amount for your marriage or your children's' marriage"
            handleClick={() => handleClaimPage(1)}
          />
        )}
        {data?.mobile_reimbursement_claim?.is_show && (
          <ClaimCards
            title="Mobile Reimbursement Claim"
            subtitle="Claim the amount for your Mobile"
            handleClick={() => handleClaimPage(2)}
          />
        )}
        {data?.car_maintenance_claim?.is_show && (
          <ClaimCards
            title="Car Maintenance Claim"
            subtitle="Claim the amount for your car maintenance"
            handleClick={() => handleClaimPage(3)}
          />
        )}
      </div>
      <div className={styles.tableWrapper}>
      <EmployeeClaimList/>

      </div>
    </div>
  );
};

export default ClaimsDetail;
