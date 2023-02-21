import React from 'react';
import BankInfo from '../../../../Employees/components/Profile/BankInfo';
import DepartmentInfo from '../../../../Employees/components/Profile/DepartmentInfo';
import GovtInfo from '../../../../Employees/components/Profile/GovtInfo';
import OfficialDetails from '../../../../Employees/components/Profile/OfficialDetails';
import PerformanceReview from '../../../../Employees/components/Profile/PerfomanceReview';
import CandidateAddressInfo from './component/CandidateAddress';
import CandidatePersonalInfo from './component/CandidatePersonalInfo';
import CandidateQualificationInfo from './component/CandidateQualificationInfo';
import styles from './Style.module.css'

function CandidateProfileView({data}) {
    // const data={};
    console.log("data",data)
  return (
    <div>
      <div className={styles.profileContainer}>
        <div className={styles.lhs}>
          <CandidatePersonalInfo data={data} />
          <CandidateAddressInfo address={data?.address} />
          <CandidateQualificationInfo contact={data?.contact} />
          {/*<Timeline />*/}
        </div>
        <div className={styles.rhs}>
          <OfficialDetails data={data} />
          <DepartmentInfo data={data} />
          <GovtInfo idCards={data?.identity_date} />
          <BankInfo bankD={data?.bank} />
          <PerformanceReview reviewer={data?.pms_reviewer} image={data?.image}/>
        </div>
      </div>
    </div>
  )
}

export default CandidateProfileView