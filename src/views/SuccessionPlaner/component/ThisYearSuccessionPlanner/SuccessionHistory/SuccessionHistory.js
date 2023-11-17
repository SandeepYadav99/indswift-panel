import React from "react";
import styles from "./Style.module.css";
import useSuccessionHistory from "./SuccessionHistory.hook";
const SuccessionHistory = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const { employeeDetails } = useSuccessionHistory({
    handleToggleSidePannel,
    isSidePanel,
    empId,
  });
  console.log("employeeDetails", employeeDetails[0]);
  return (
    <div className={styles.successContainer}>
      <div>
        <div className={styles.employ}>
          <div>
            <div className={styles.title}>Employee Name:</div>
            <span>{employeeDetails?.name}</span>
          </div>
          <div className={styles.empCode}>
            <div className={styles.title}>Employee Code:</div>
            <span>{employeeDetails?.emp_code}</span>
          </div>
        </div>
        <div>
          {" "}
          <br />
          <div className={styles.title}>Annual Salary:</div>
          {/* <span>{item?.ctc && `₹ ${item?.ctc}`}</span> */}
        </div>
      </div>{" "}
      <br />
      {employeeDetails?.length > 0 ? (
        employeeDetails?.map((item, index) => (
          <div key={`History_${index}`}>
            <div className={styles.container}>
              <div className={styles.leftColumn}>
                <p>
                  Employee Continuing With Company:{" "}
                  <b> {item?.is_continuing ? "Yes" : "No"}</b>
                  <span style={{ marginLeft: "30%" }}>In-Place</span>
                </p>
                <p>
                  Last Working Date: <b>10/06/2022</b>
                </p>
                <p>
                  Annual Salary: <b>₹17,54,713</b>
                </p>
                <p>
                  Type of Succession: <b>Internal</b>
                  <a href="" style={{ marginLeft: "30%" }}>
                    View certificate
                  </a>
                </p>
                <p>
                  Replacing Person: <b>Akhilesh Singh (11203900) </b>
                </p>
              </div>
              <div className={styles.rightColumn}>
                <p>
                  Salary: <b>{item?.ctc && `₹ ${item?.ctc}`}</b>
                </p>
                <p>
                  Succession's Cost WRT employee: <b>-5%</b>
                </p>
                <p>
                  Pending Dues:{" "}
                  <b>{item?.pending_dues ? item?.pending_dues : "Nothing Pending"}</b>
                </p>
                <p>
                  Notes: <b>{item?.notes ? item?.notes : "-"}</b>
                </p>
              </div>
              <hr />
              <div>
                <div>
                  <b>Comments</b>
                </div>
                <p>APPROVED</p>
                <p>Pranav Bhasin | 21/02/2023</p>
              </div>
              <hr />
              <div className={styles.avator}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="" className={styles.image} alt="" />
                  <p>Sahil Munjal</p>
                </div>
                <div>10/06/2021 11:10:00</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <span>No Data Found....</span>
      )}
    </div>
  );
};

export default SuccessionHistory;
