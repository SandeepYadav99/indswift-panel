import React from "react";
import CandidateAddressInfo from "./component/CandidateAddress";
import CandidateAssociateJob from "./component/CandidateAssociateJob";
import CandidateEmployment from "./component/CandidateEmployment";
import CandidatePersonalInfo from "./component/CandidatePersonalInfo";
import CandidateQualificationInfo from "./component/CandidateQualificationInfo";
import CandidateUploadCard from "./component/CandidateUploadCard";
import styles from "./Style.module.css";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { useCallback } from "react";
import { serviceSendIrfReminder } from "../../../../../services/CVShortlist.service";

function CandidateProfileView({ data }) {
  const handleCVShortlistReminder = useCallback(() => {
    console.log("isv");
    if (data) {
      serviceSendIrfReminder({
        candidate_id: data?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Reminder Sent");
        }
      });
    }
  }, [data]);
  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.lhs}>
          <CandidatePersonalInfo data={data} />
          <CandidateAddressInfo address={data} />
          <CandidateQualificationInfo qualification={data?.qualifications} />
          {/*<Timeline />*/}
        </div>
        <div className={styles.rhs}>
          <CandidateAssociateJob data={data} />
          <CandidateUploadCard
            data={data}
            handleSubmit={handleCVShortlistReminder}
          />
          <CandidateEmployment history={data?.employment_history} />
        </div>
      </div>
    </div>
  );
}

export default CandidateProfileView;
