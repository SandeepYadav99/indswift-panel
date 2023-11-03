import React from "react";
import styles from "./Style.module.css";
import image from "../../../assets/img/download.png";
import historyUtils from "../../../libs/history.utils";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

import useRelievingExpLetterDetail from "./RelievingExpLetterDetailHook";

function RelievingExpLetterDetail({ data, isImprest }) {
  const { form, changeTextData, relievingExpDetails, submitToApprove } =
    useRelievingExpLetterDetail();

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
                    alt=""
                    className={styles.claimimg}
                    src={
                      relievingExpDetails?.employee?.image
                        ? relievingExpDetails?.employee?.image
                        : image
                    }
                  />
                </div>
                <div>
                  <div className={styles.key}>
                    <span className={styles.value}>Name:</span>
                    {relievingExpDetails?.employee?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>D.O.B:</span>
                    {relievingExpDetails?.employee?.dob}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Department:</span>
                    {relievingExpDetails?.employee?.department?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>P.F A/C No.:</span>
                    {/* {relievingExpDetails?.employee?.identity_date?.uan_no}  */}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>ESI Number:</span>
                    {relievingExpDetails?.employee?.identity_date?.esi_no ||
                      "N/A"}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>
                      Days worked after resignation:
                    </span>
                    {data?.location?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Reason for leaving:</span>
                    {"RESIGNED/ABSCONDED/EXPIRED/RETIRED/TERMINATED"}
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
                    // isError={errorData?.is_education_verification_status}
                    // errorText={errorData?.is_education_verification_status}
                    value={form?.general_conduct}
                    handleChange={(value) => {
                      changeTextData(value, "general_conduct");
                    }}
                  >
                    <MenuItem value={"ENDORSE"}>Endorse</MenuItem>
                    <MenuItem value={"POOR"}>Poor</MenuItem>
                    <MenuItem value={"AVERAGE"}>Average</MenuItem>
                    <MenuItem value={"GOOD"}>Good</MenuItem>
                    <MenuItem value={"EXCELLENT"}>Excellent</MenuItem>
                  </CustomSelectField>
                </div>
              </div>
              <div className={styles.vertical}></div>
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Father's Name:</span>
                  {relievingExpDetails?.employee?.family?.father_name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Employee Code:</span>
                  {`${relievingExpDetails?.employee?.emp_code} `}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Designation:</span>
                  {relievingExpDetails?.employee?.designation?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>UAN Number:</span>
                  {relievingExpDetails?.employee?.identity_date?.uan_no}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>
                    Worked in organisazation for:
                  </span>
                  {relievingExpDetails?.employee?.experience?.current}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Worked on NAPS</span>
                  {relievingExpDetails?.employee?.naps?.employee?.naps?.doe
                    ? "Yes"
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.approveContainer}>
        <ButtonBase
          onClick={() => submitToApprove()}
          className={styles.approvebutton}
        >
          APPROVE & GENERATE
        </ButtonBase>
      </div>
    </div>
  );
}

export default RelievingExpLetterDetail;
