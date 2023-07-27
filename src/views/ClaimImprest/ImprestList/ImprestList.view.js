import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import useImprestList from "./ImprestList.hook";
import { Add } from "@material-ui/icons";
import ImprestUpperTable from "./Component/ImprestUpperTable/ImprestUpperTable.view";
import TravelTable from "../ImprestApprovalDetail/Component/TravelTable/TravelTable.component";
import OtherTable from "../ImprestApprovalDetail/Component/OtherTable/OtherTable.component";

const ImprestList = ({ jobId }) => {
  const { handleAddCandidate, candidateEl, handleCreate, typeData, user_id ,handleCsvDownload} =
    useImprestList({
      jobId,
    });
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.btmFlex}>
          <div style={{ flex: "1" }}>
            <div className={styles.heading}>My Imprest Requests</div>
            <div className={styles.newLine} />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <ButtonBase
              className={styles.createBtn}
              aria-owns={candidateEl ? "candidateEl" : undefined}
              aria-haspopup="true"
              onClick={handleCreate}
            >
              New Request
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <ImprestUpperTable />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Non Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
          </div>

          <div className={styles.experseWrap}>
            BALANCE :{` ₹ ${typeData?.other?.INR?.balance} `}
            <div className={styles.rightFlex}>
              <ButtonBase
                className={styles.download}
                onClick={()=>handleCsvDownload('OTHER')}
              >
                DOWNLOAD
              </ButtonBase>
            </div>
          </div>
        </div>
        <OtherTable jobId={user_id} Claimtype="OTHER" />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span>
              <b>Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
          </div>
          <div className={styles.experseWrap}>
            BALANCE :{` ₹ ${typeData?.travel?.INR?.balance} |`}
            {` $ ${typeData?.travel?.USD?.balance} |`}
            {` € ${typeData?.travel?.EUR?.balance} `}
            {typeData?.expense_budget !== undefined &&
              ` EXPENSES : ${typeData?.expense_budget}`}
            <div className={styles.rightFlex}>
              <ButtonBase
                className={styles.download}
                onClick={()=>handleCsvDownload('TRAVEL')}
              >
                DOWNLOAD
              </ButtonBase>
            </div>
          </div>
        </div>
        <TravelTable jobId={user_id} Claimtype="TRAVEL" />
      </div>
    </div>
  );
};

export default ImprestList;
