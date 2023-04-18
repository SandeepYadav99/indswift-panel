import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useClaimsDetail from "./ClaimsDetailHook";
import ClaimCards from "./components/ClaimCards/ClaimCards";
import EmployeeClaimList from "./components/EmployeeClaimList/EmployeeClaimList.container";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import { myClaimData } from "../../../helper/helper";

const ClaimsDetail = () => {
  const { handleClaimPage, data } = useClaimsDetail({});
  return (
    <div className={styles.claimsDetailWrapper}>
      <div className={styles.infoWrap}>
      <InformationCard
        heading="My Claims"
        data={myClaimData}
        isClaimPage={true}
      />
      </div>
      
      <div className={styles.claimContainer}>
        {data?.marriage_gift_claim?.is_show && (
          <ClaimCards
            title="Marriage Gift Card Claim"
            subtitle="Claim the amount for your Marriage or your Children's Marriage as per Marriage Gift Policy of Organization"
            handleClick={() => handleClaimPage(1)}
          />
        )}
        {data?.mobile_reimbursement_claim?.is_show && (
          <ClaimCards
            title="Mobile Reimbursement Claim"
            subtitle="Claim the Reimbursement Amount for your Mobile Device as Per Mobile Policy of Organization"
            handleClick={() => handleClaimPage(2)}
          />
        )}
        {data?.car_maintenance_claim?.is_show && (
          <ClaimCards
            title="Car Maintenance Claim"
            subtitle="Claim the Reimbursement Amount for your Car Maintenance as per Car Policy of Organization"
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
