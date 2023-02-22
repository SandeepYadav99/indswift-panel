import React from 'react';
import BankInfo from '../../../../Employees/components/Profile/BankInfo';
import DepartmentInfo from '../../../../Employees/components/Profile/DepartmentInfo';
import GovtInfo from '../../../../Employees/components/Profile/GovtInfo';
import OfficialDetails from '../../../../Employees/components/Profile/OfficialDetails';
import PerformanceReview from '../../../../Employees/components/Profile/PerfomanceReview';
import CandidateAddressInfo from './component/CandidateAddress';
import CandidateAssociateJob from './component/CandidateAssociateJob';
import CandidateEmployment from './component/CandidateEmployment';
import CandidatePersonalInfo from './component/CandidatePersonalInfo';
import CandidateQualificationInfo from './component/CandidateQualificationInfo';
import CandidateUploadCard from './component/CandidateUploadCard';
import styles from './Style.module.css'

function CandidateProfileView({data}) {
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
          <CandidateUploadCard data={data} />
          <CandidateEmployment history={data?.employment_history}/>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfileView