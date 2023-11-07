import React from "react";
import styles from "./Style.module.css";
const HREscalationMatrixView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoImg}>
        <img
          src={require("../../assets/img/login logo@2x.png")}
          className={styles.sky}
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
            <td>ISLL Corporate Office </td>
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
          </tr>
          <tr>
            <td>ISLL Corporate Office </td>
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
          </tr>
          <tr className={styles.grayRow}>
            <td>ISLL Corporate Office </td>
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
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
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
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
            <td>Rajesh Kumar</td>
            <td>9875924231</td>
            <td>hr.ho@indswiftlab.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HREscalationMatrixView;
