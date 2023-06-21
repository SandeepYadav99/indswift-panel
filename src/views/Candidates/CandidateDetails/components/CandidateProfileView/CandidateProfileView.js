import React from "react";
import CandidateAddressInfo from "./component/CandidateAddress";
import CandidateAssociateJob from "./component/CandidateAssociateJob";
import CandidateEmployment from "./component/CandidateEmployment";
import CandidatePersonalInfo from "./component/CandidatePersonalInfo";
import CandidateQualificationInfo from "./component/CandidateQualificationInfo";
import CandidateUploadCard from "./component/CandidateUploadCard";
import styles from "./Style.module.css";

function CandidateProfileView({ data , handleConfirm,handleEaf}) {
  

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
            handleSubmit={handleConfirm}
            handleResendEafClick={handleEaf}
          />
          <CandidateEmployment history={data?.employment_history} />
        </div>
      </div>
    </div>
  );
}

export default CandidateProfileView;
