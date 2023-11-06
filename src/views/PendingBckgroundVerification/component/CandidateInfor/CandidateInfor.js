import React,{useEffect} from 'react'
import styles from "./CandidateInfor.module.css"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { actionGetEmployeeDetails } from "../../../../actions/Employee.action";
const CandidateInfor = ({empId}) => {

const dispatch = useDispatch();
  useEffect(() => {
    if (empId) {
      dispatch(actionGetEmployeeDetails(empId));
    }
  }, [empId]);

  const { employeeData } = useSelector((state) => state.employee);

  return (
    <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Candidate Information - <span>{employeeData?.code}</span>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Name:</span>
                {employeeData?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Month:</span>
                {employeeData?.verificationText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location:</span>
                {employeeData?.location?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Accepted:</span>
                {employeeData?.designation?.name}{" "}
                {employeeData?.designation_note && <>({employeeData?.designation_note})</>}
              </div>
            </div>

            <div className={styles.vertical}></div>
            <div className={styles.right}>
              {/* <div className={styles.key}>
                <span className={styles.value}>PRC:</span>
                {employeeData?.code}
              </div> */}
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {/* {valencyChange(employeeData?.vacancy_type)} */}
                {employeeData?.designation?.name ? employeeData?.designation?.name :"NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {employeeData?.department?.name
                  ? employeeData?.department?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Offer Date:</span>
                {employeeData?.replacing_person?.name
                  ? employeeData?.replacing_person?.name
                  : "NA"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DOJ:</span>
                {employeeData?.doj
                  ? `${employeeData?.doj}`
                  : "NA"}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CandidateInfor