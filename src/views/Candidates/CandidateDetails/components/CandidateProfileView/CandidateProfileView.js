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
import {serviceResendEaf} from "../../../../../services/Candidate.service";

function CandidateProfileView({ data }) {
  const handleCVShortlistReminder = useCallback(() => {
    if (data) {
      serviceSendIrfReminder({
        candidate_id: data?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("IRF form send successfully");
        }
      });
    }
  }, [data]);

  const handleResendEafClick = useCallback(() => {
    if (data) {
      serviceResendEaf(data?.id).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("EAF form send successfully");
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
            handleResendEafClick={handleResendEafClick}
          />
          <CandidateEmployment history={data?.employment_history} />
        </div>
      </div>
    </div>
  );
}

export default CandidateProfileView;
