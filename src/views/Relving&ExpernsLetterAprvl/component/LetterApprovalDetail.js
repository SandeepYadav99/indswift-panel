import React from "react";
import styles from "./Style.module.css";
import image from "../../../assets/img/download.png";
import historyUtils from "../../../libs/history.utils";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

function LetterApprovalDetail({ data, isImprest }) {
  return (
    <div>
      <div className={styles.claimListWrapper}>
        <div style={{ marginBottom: "20px" }}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Relieving & Experience Letter Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.editFlex}>
              <div className={styles.heading}>Employee Information</div>
            </div>

            <div className={styles.mainFlex}>
              <div className={styles.left221}>
                <div>
                  <img
                    className={styles.claimimg}
                    src={data?.image ? data?.image : image}
                  />
                </div>
                <div>
                  <div className={styles.key}>
                    <span className={styles.value}>Name:</span>
                    {data?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>D.O.B:</span>
                    {data?.emp_code}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Department:</span>
                    {data?.location?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>P.F A/C No.:</span>
                    {data?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>ESI Number:</span>
                    {data?.emp_code}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Days worked after resignation:
                    </span>
                    {data?.location?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Reason for leaving:</span>
                    {data?.location?.name}
                  </div>
                  {!isImprest && data?.experience?.current && (
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Experience with Organization:
                      </span>
                      {data?.experience?.current > 1
                        ? `${data?.experience?.current} yrs`
                        : `${data.experience.current} yr`}
                    </div>
                  )}
                  <CustomSelectField
                    label={"General Conduct"}
                    value={"type"}
                    // handleChange={(value) => {
                    //   setType(value);
                    //   sessionStorage.setItem("typeClaim", value);
                    // }}
                  >
                    <MenuItem value={"MARRAIGE"}>Good</MenuItem>

                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.vertical}></div>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Father's Name:</span>
                  {data?.designation?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Employee Code:</span>
                  {`${data?.grade?.code} / ${data?.cadre?.code}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Designation:</span>
                  {data?.department?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>UAN Number:</span>
                  {data?.designation?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>
                    Worked in organisazation for:
                  </span>
                  {`${data?.grade?.code} / ${data?.cadre?.code}`}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Worked on NAPS</span>
                  {data?.department?.name}
                </div>
                {!isImprest && data?.experience?.total && (
                  <div className={styles.key}>
                    <span className={styles.value}>Total Experience:</span>
                    {data?.experience?.total > 1
                      ? `${data?.experience?.total} yrs`
                      : `${data.experience.total} yr`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterApprovalDetail;
