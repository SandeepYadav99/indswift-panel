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
import EmployeeLoanList from "./components/EmployeeLoanList/EmployeeLoanList.view";

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
            enableBtn={data?.marriage_gift_claim?.can_claim}
          />
        )}
        {data?.mobile_reimbursement_claim?.is_show && (
          <ClaimCards
            title="Mobile Reimbursement Claim"
            subtitle="Claim the Reimbursement Amount for your Mobile Device as Per Mobile Policy of Organization"
            handleClick={() => handleClaimPage(2)}
            enableBtn={data?.mobile_reimbursement_claim?.can_claim}
          />
        )}
        {data?.car_maintenance_claim?.is_show && (
          <ClaimCards
            title="Car Maintenance Claim"
            subtitle="Claim the Reimbursement Amount for your Car Maintenance as per Car Policy of Organization"
            handleClick={() => handleClaimPage(3)}
            enableBtn={data?.car_maintenance_claim?.can_claim}
          />
        )}
        {data?.phc_claim?.is_show && (
          <ClaimCards
            title="Preventive Health Check-up Claim"
            subtitle="Claim the amount for your PHC"
            handleClick={() => handleClaimPage(4)}
            enableBtn={data?.phc_claim?.can_claim}
          />
          )}
          {data?.local_travel_claim?.is_show && (
          <ClaimCards
            title="Local Travel Claim Form"
            subtitle="Claim the amount for your Local Travel"
            handleClick={() => handleClaimPage(5)}
            enableBtn={data?.local_travel_claim?.can_claim}
          />
           )}
           {data?.relocation_claim?.is_show && (
          <ClaimCards
            title="Relocation Expense Claim"
            subtitle="Claim your expense in case of new joinee approved for relocation expense or a transfer case of employee."
            handleClick={() => handleClaimPage(6)}
            enableBtn={data?.relocation_claim?.can_claim}
          />
           )}
           <ClaimCards
           title="Loan Application"
           subtitle="Request Personal loan from Company as per company Employee Loan Policy"
           handleClick={() => handleClaimPage(7)}
           enableBtn
           />
      </div>
      <div className={styles.tableWrapper}>
        <EmployeeClaimList />
        <EmployeeLoanList/>
      </div>
    </div>
  );
};

export default ClaimsDetail;
