import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";

function ClaimDetailInfo({ idCards }) {
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.heading}>Claim Details</div>
          <div>
            <StatusPill status={removeUnderScore(idCards?.status)} />
          </div>
        </div>
        {idCards?.claimTypeText && idCards?.claimTypeText === "Marraige" && (
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Claim type :</span>
                {idCards?.claimTypeText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Marriage of :</span>
                {idCards?.marraige_of}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Processed:</span>
                {idCards?.claim_details?.total_claim &&
                  `₹ ${idCards?.claim_details?.total_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {idCards?.claim_details?.progress_claim &&
                  `₹ ${idCards?.claim_details?.progress_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Pending Claim:</span>
                {idCards?.claim_details?.pending_claim &&
                  ` ₹ ${idCards?.claim_details?.pending_claim}`}
              </div>

              <div className={styles.key}>
                <a href={idCards?.document} target="_blank">
                  <div className={styles.hyperlinkText}>View Attachment</div>
                </a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Marraige Date :</span>
                {idCards?.domText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Entitled Amount:</span>
                {idCards?.claim_details?.entitled_amount &&
                  `₹ ${idCards?.claim_details?.entitled_amount}`}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {idCards?.claim_amount && `₹  ${idCards?.claim_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Raised on:</span>
                {idCards?.claimDate}
              </div>
            </div>
          </div>
        )}
        {idCards?.claimTypeText && idCards?.claimTypeText === "Mobile" && (
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Claim type :</span>
                {idCards?.claimTypeText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Official Phone Number</span>
                {idCards?.official_contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Bill Amount:</span>
                {idCards?.bill_amount && `₹ ${idCards?.bill_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Processed:</span>
                {idCards?.claim_details?.total_claim &&
                  `₹ ${idCards?.claim_details?.total_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {idCards?.claim_details?.progress_claim &&
                  `₹ ${idCards?.claim_details?.progress_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Pending Claim:</span>
                {idCards?.claim_details?.pending_claim &&
                  ` ₹ ${idCards?.claim_details?.pending_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Invoice Number:</span>
                {idCards?.invoice_no ? idCards?.invoice_no : "-"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Last Claim Date:</span>
                {idCards?.employee?.lastMobInvoiceDateText
                  ? idCards?.employee?.lastMobInvoiceDateText
                  : "-"}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Bill Date:</span>
                {idCards?.billDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Entitled Amount:</span>
                {idCards?.claim_details?.entitled_amount &&
                  `₹ ${idCards?.claim_details?.entitled_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {idCards?.claim_amount && `₹  ${idCards?.claim_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Mode :</span>
                {idCards?.payment_mode ? idCards?.payment_mode : "-"}
              </div>
              <div className={styles.key} style={{ display: "flex" }}>
                <span className={styles.value}>Payment Proof :</span>
                {idCards?.payment_proof ? (
                  <a href={idCards?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      Payment Attachment
                    </div>
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div className={styles.key}>
                <a href={idCards?.document} target="_blank">
                  <div className={styles.hyperlinkText}>View Attachment</div>
                </a>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Raised on:</span>
                {idCards?.claimDate}
              </div>
            </div>
          </div>
        )}
        {idCards?.claimTypeText && idCards?.claimTypeText === "Car" && (
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Claim type :</span>
                {idCards?.claimTypeText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Vehicle Number:</span>
                {idCards?.vehicle_no}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Bill Amount:</span>
                {idCards?.bill_amount && `₹ ${idCards?.bill_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Processed:</span>
                {idCards?.claim_details?.total_claim &&
                  `₹ ${idCards?.claim_details?.total_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {idCards?.claim_details?.progress_claim &&
                  `₹ ${idCards?.claim_details?.progress_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Pending Claim:</span>
                {idCards?.claim_details?.pending_claim &&
                  ` ₹ ${idCards?.claim_details?.pending_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Invoice Number:</span>
                {idCards?.invoice_no ? idCards?.invoice_no : "-"}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Bill Date:</span>
                {idCards?.billDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Entitled Amount:</span>
                {idCards?.claim_details?.entitled_amount &&
                  `₹ ${idCards?.claim_details?.entitled_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {idCards?.claim_amount && `₹  ${idCards?.claim_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Mode :</span>
                {idCards?.payment_mode ? idCards?.payment_mode : "-"}
              </div>
              <div className={styles.key} >
                <span className={styles.value}>Payment Proof :</span>
                {idCards?.payment_proof ? (
                  <a href={idCards?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      Payment Attachment
                    </div>
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div className={styles.key}>
                <a href={idCards?.document} target="_blank">
                  <div className={styles.hyperlinkText}>View Attachment</div>
                </a>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Raised on:</span>
                {idCards?.claimDate}
              </div>
            </div>
          </div>
        )}
        {idCards?.claimTypeText && idCards?.claimTypeText === "Phc" && (
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Claim type :</span>
                {idCards?.claimTypeText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>PHC Conducted on:</span>
                {idCards?.phcDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>PHC Conducted from:</span>
                {idCards?.phc_centre}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Bill Amount:</span>
                {idCards?.bill_amount && `₹ ${idCards?.bill_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Processed:</span>
                {idCards?.claim_details?.total_claim &&
                  `₹ ${idCards?.claim_details?.total_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim in Process:</span>
                {idCards?.claim_details?.progress_claim &&
                  `₹ ${idCards?.claim_details?.progress_claim}`}
              </div>
              <div className={styles.key}>
                <a href={idCards?.document} target="_blank">
                  <div className={styles.hyperlinkText}>View Attachment</div>
                </a>
              </div>
              {/* <div className={styles.key}>
                <span className={styles.value}>Invoice Number:</span>
                {idCards?.invoice_no ? idCards?.invoice_no : '-' }
              </div> */}
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Bill Date:</span>
                {idCards?.billDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Entitled Amount:</span>
                {idCards?.claim_details?.entitled_amount &&
                  `₹ ${idCards?.claim_details?.entitled_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Amount to be Reimbursed:</span>
                {idCards?.claim_amount && `₹  ${idCards?.claim_amount}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Payment Mode :</span>
                {idCards?.payment_mode ? idCards?.payment_mode : "-"}
              </div>
              <div className={styles.key} style={{ display: "flex" }}>
                <span className={styles.value}>Payment Proof :</span>
                {idCards?.payment_proof ? (
                  <a href={idCards?.payment_proof} target="_blank">
                    <div className={styles.hyperlinkText}>
                      Payment Attachment
                    </div>
                  </a>
                ) : (
                  "-"
                )}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Pending Claim:</span>
                {idCards?.claim_details?.pending_claim &&
                  ` ₹ ${idCards?.claim_details?.pending_claim}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Claim Raised on:</span>
                {idCards?.claimDate}
              </div>
            </div>
          </div>
        )}

        {idCards?.claimTypeText &&
          idCards?.claimTypeText === "Local_travel" && (
            <div>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Claim type :</span>
                    {removeUnderScore(idCards?.claimTypeText)}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Reimbursement Month:</span>
                    {idCards?.rem_month}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Claim in Process:</span>
                    {idCards?.claim_details?.progress_claim &&
                      `₹ ${idCards?.claim_details?.progress_claim}`}
                  </div>
                  <div className={styles.key}>
                    <a href={idCards?.od_ss} target="_blank">
                      <div className={styles.hyperlinkText}>
                        View OD Screenshot 1
                      </div>
                    </a>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Total Bill Amount:</span>
                    {idCards?.bill_amount && `₹ ${idCards?.bill_amount}`}
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>
                      Amount to be Reimbursed:
                    </span>
                    {idCards?.claim_amount && `₹  ${idCards?.claim_amount}`}
                  </div>
                  {idCards?.od_ss_2 && (
                    <div className={styles.key}>
                      <a href={idCards?.od_ss_2} target="_blank">
                        <div className={styles.hyperlinkText}>
                          View OD Screenshot 2
                        </div>
                      </a>
                    </div>
                  )}
                  <div className={styles.key}>
                    <span className={styles.value}>Claim Raised on:</span>
                    {idCards?.claimDate}
                  </div>
                </div>
              </div>
              {idCards?.co_passengers?.length > 0 && (
                <div className={styles.coWrap}>
                  <div className={styles.verticalLine}></div>
                  <div className={styles.coCont}>
                    <div className={styles.heading}>Co- traveler Details</div>
                    <div>
                      {idCards?.co_passengers?.map((item, index) => (
                        <div
                          className={styles.coName}
                          key={`Co_${index}`}
                        >{`${item?.name} (${item?.emp_code})`}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        {idCards?.claimTypeText && idCards?.claimTypeText === "Phc" && (
          <div className={styles.prcReportWrap}>
            <div className={styles.key221}>
              <span className={styles.heading221}>
                List of Investigations under PHC:
              </span>
              <span className={styles.list}>{idCards?.list}</span>
            </div>
            <div>
              <a href={idCards?.medical_report} target="_blank">
                <div className={styles.hyperlinkText}>View PHC Report</div>
              </a>
            </div>
          </div>
        )}
        {idCards?.claimTypeText && idCards?.claimTypeText === "Relocation" && (
          <div>
            <div className={styles.mainFlex}>
              <div className={styles.left}>
              <div className={styles.key}>
                  <span className={styles.value}>Claim type:</span>
                  {idCards?.claimTypeText}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Amount Claimed:</span>
                  {idCards?.claim_details?.total_claim && `₹ ${idCards?.claim_details?.total_claim}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Claim type :</span>
                  {removeUnderScore(idCards?.relocation_type)}
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.key}>
                  <span className={styles.value}>Claim in Process:</span>
                  {idCards?.claim_details?.progress_claim &&
                    `₹ ${idCards?.claim_details?.progress_claim}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>
                    Date of Joining/Transfer:
                  </span>
                  {idCards?.relocationDateText}
                </div>

                <div className={styles.key}>
                  <span className={styles.value}>Claim Raised on:</span>
                  {idCards?.claimDate}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClaimDetailInfo;
