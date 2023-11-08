import React from "react";
import styles from "./Style.module.css";
const SuccessionHistory = () => {
  return (
    <div className={styles.successContainer}>
      <div>
        <div className={styles.employ}>
          <div>
            <div className={styles.title}>Employee Name:</div>
            <span>Name</span>
          </div>
          <div className={styles.empCode}>
            <div className={styles.title}>Employee Code:</div>
            <span>Code</span>
          </div>
        </div>
        <div>
          {" "}
          <br />
          <div className={styles.title}>Annual Salary:</div>
          <span>Salary</span>
        </div>
      </div>{" "}
      <br />
      <div>
        <div  className={styles.container}>
          <div  className={styles.leftColumn}>
            <p>Employee Continuing With Company: <b> No</b><span style={{marginLeft:"30%"}}>In-Place</span></p>
            <p>Last Working Date: <b>10/06/2022</b></p>
            <p>Annual Salary: <b>₹17,54,713</b></p>
            <p>Type of Succession: <b>Internal</b><a href="" style={{marginLeft:"30%"}}>View certificate</a></p>
            <p>Replacing Person: <b>Akhilesh Singh (11203900) </b></p>
          </div>
          <div className={styles.rightColumn}>
            <p>Salary: <b>₹12,54,713</b></p>
            <p>Succession's Cost WRT employee: <b>-5%</b></p>
            <p>Pending Dues: <b>Nothing Pending</b></p>
            <p>Notes: <b>N.A</b></p>
          </div>
          <hr/>
          <div>
            <div>Comments</div>
            <p>APPROVED</p>
            <p>Pranav Bhasin | 21/02/2023</p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SuccessionHistory;
