import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useClaimsDetail from "./ClaimsDetailHook";
import ClaimCards from "./components/ClaimCards/ClaimCards";
import ClaimMarriageCard from "./components/ClaimMarriageCard/ClaimMarriageCard.view";
import ClaimMobileCard from "./components/ClaimMobileCard/ClaimMobileCard.view";

const ClaimsDetail = () => {
  const { handleClaimPage } = useClaimsDetail({});
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
        <ClaimCards
          title="Marriage Gift Card Claim"
          subtitle="Claim the amount for your marriage or your children's' marriage"
          handleClick={() => handleClaimPage(1)}
        />
        <ClaimCards
          title="Mobile Reimbursement Claim"
          subtitle="Claim the amount for your Mobile"
          handleClick={() => handleClaimPage(2)}
        />
        <ClaimCards
          title="Car Maintenance Claim"
          subtitle="Claim the amount for your car maintenance"
          handleClick={() => handleClaimPage(3)}
        />
      </div>
      {/* <ClaimMarriageCard />
      <ClaimMobileCard /> */}
      {/* <div className={styles.btnCont}>
        <ButtonBase type={"button"} className={styles.createBtn}>
          UPDATE INFORMATION
        </ButtonBase>
      </div> */}
    </div>
  );
};

export default ClaimsDetail;
