import React from "react";
import styles from "./Style.module.css";
const HREscalationMatrixView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoImg}>
        <img
          src={require("../../assets/img/login logo@2x.png")}
          className={styles.sky}
          alt=""
        />
      </div>
      <div className={styles.loginSignupText}>
        <h1 className={styles.headingText}>HR Escalation Matrix</h1>
        <div className={styles.newLine} />
      </div>

      <table className={styles.myTable}>
        <thead>
          <tr className={styles.centerText}>
            <th colSpan="4">ESCALATION LEVEL I/III</th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.bgColorRow}>
            <td>If you are joining at</td>
            <td>Name</td>
            <td>Contact</td>
            <td>Email</td>
          </tr>
          <tr>
            <td>ISLL Corporate Office </td>
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
          </tr>
          <tr className={styles.grayRow}>
            <td>ISLL Derabassi (API)</td>
            <td>Mohit</td>
            <td>8968374200</td>
            <td>hr.jobs@indswiftlabs.com</td>
          </tr>
          <tr>
            <td>ISLL Samba (API)</td>
            <td>Shubham Bharti</td>
            <td>8825030390</td>
            <td>corporate.hr@indswiftlabs.com</td>
          </tr>
          <tr className={styles.grayRow}>
            <td>R&D Mohali </td>
            <td>Anupam Sharma</td>
            <td>9878829553</td>
            <td>hr.ho@indswiftlabs.com</td>
          </tr>
          <tr >
            <td>Essix (API) </td>
            <td>Davinder Pal</td>
            <td>8146183255</td>
            <td>hr.ho@indswiftlabs.com</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.centerText}>
            <th colSpan="4">ESCALATION LEVEL I/III</th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.bgColorRow}>
            <td>If you are joining at</td>
            <td>Name</td>
            <td>Contact</td>
            <td>Email</td>
          </tr>
          <tr>
            <td>Corporate Lead HR </td>
            <td>Akashdeep Sharma</td>
            <td>9875924231</td>
            <td>akashdeep.sharma@indswiftlab.com</td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <table className={styles.myTable}>
        <thead>
          <tr className={styles.centerText}>
            <th colSpan="4">ESCALATION LEVEL I/III</th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.bgColorRow}>
            <td>If you are joining at</td>
            <td>Name</td>
            <td>Contact</td>
            <td>Email</td>
          </tr>
          <tr>
            <td>ISLL Corporate Office </td>
            <td>Atul Kumar Chaubey</td>
            <td>Atul Kumar Chaubey</td>
            <td>atul.chaubey@indswiftlab.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HREscalationMatrixView;
