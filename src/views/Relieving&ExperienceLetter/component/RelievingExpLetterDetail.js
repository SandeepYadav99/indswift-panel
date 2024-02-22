import React from "react";
import styles from "./Style.module.css";
import image from "../../../assets/img/download.png";
import historyUtils from "../../../libs/history.utils";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useRelievingExpLetterDetail from "./RelievingExpLetterDetailHook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { removeUnderScore } from "../../../helper/helper";
import StatusPill from "../../../components/Status/StatusPill.component";

function RelievingExpLetterDetail({ data, isImprest }) {
  const {
    form,
    changeTextData,
    relievingExpDetails,
    handleSubmitToApprove,
    errorData,
    isSiteHRApprovedPending,
  } = useRelievingExpLetterDetail();

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
              <div className={styles.adjustImageContainer}>
                <div className={styles.imageAlignCenter}>
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
                <div className={styles.detailContainer}>
                  <div className={styles.left221}>
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
                        <span className={styles.value}>ESI Number:</span>
                        {relievingExpDetails?.employee?.identity_date?.esi_no ||
                          "N/A"}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Days worked after resignation:{" "}
                        </span>
                        {relievingExpDetails?.employee?.workingDayResignation}
                      </div>
                      <div className={styles.key}>
                        <span className={styles.value}>
                          Reason for leaving:
                        </span>
                        {relievingExpDetails?.experienceLetter?.reason}
                      </div>
                      <div className={styles.dropDownContainer}>
                        {relievingExpDetails?.experienceLetter?.status ===
                          "SITE_HR_APPROVED" &&
                          relievingExpDetails?.status === "PENDING" && (
                            <CustomSelectField
                              label={"General Conduct"}
                              isError={errorData?.general_conduct}
                              errorText={errorData?.general_conduct}
                              value={form?.general_conduct}
                              handleChange={(value) => {
                                changeTextData(value, "general_conduct");
                              }}
                            >
                              <MenuItem value={"CAN'T_ENDORSE"}>
                                Can't Endorse
                              </MenuItem>
                              <MenuItem value={"POOR"}>Poor</MenuItem>
                              <MenuItem value={"AVERAGE"}>Average</MenuItem>
                              <MenuItem value={"GOOD"}>Good</MenuItem>
                              <MenuItem value={"EXCELLENT"}>Excellent</MenuItem>
                            </CustomSelectField>
                          )}
                        {(relievingExpDetails?.experienceLetter?.status ===
                          "PENDING" ||
                          relievingExpDetails?.experienceLetter?.status ===
                            "SITE_HR_APPROVED") &&
                          relievingExpDetails?.status === "PENDING" && (
                            <div>
                              <CustomTextField
                                isError={errorData?.comment}
                                errorText={errorData?.comment}
                                label={"Add comments (Optional)"}
                                value={form?.comment}
                                onTextChange={(text) => {
                                  changeTextData(text, "comment");
                                }}
                                multiline
                                rows={3}
                              />
                            </div>
                          )}
                      </div>
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
                      {relievingExpDetails?.employee?.trainee_id
                        ? "Yes"
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className={styles.mobileDropDown}>
                  {relievingExpDetails?.experienceLetter?.status ===
                    "SITE_HR_APPROVED" &&
                    relievingExpDetails?.status === "PENDING" && (
                      <CustomSelectField
                        label={"General Conduct"}
                        isError={errorData?.general_conduct}
                        errorText={errorData?.general_conduct}
                        value={form?.general_conduct}
                        handleChange={(value) => {
                          changeTextData(value, "general_conduct");
                        }}
                      >
                        <MenuItem value={"CAN'T_ENDORSE"}>
                          Can't Endorse
                        </MenuItem>
                        <MenuItem value={"POOR"}>Poor</MenuItem>
                        <MenuItem value={"AVERAGE"}>Average</MenuItem>
                        <MenuItem value={"GOOD"}>Good</MenuItem>
                        <MenuItem value={"EXCELLENT"}>Excellent</MenuItem>
                      </CustomSelectField>
                    )}
                  {(relievingExpDetails?.experienceLetter?.status ===
                    "PENDING" ||
                    relievingExpDetails?.experienceLetter?.status ===
                      "SITE_HR_APPROVED") &&
                    relievingExpDetails?.status === "PENDING" && (
                      <div>
                        <CustomTextField
                          isError={errorData?.comment}
                          errorText={errorData?.comment}
                          label={"Add comments (Optional)"}
                          value={form?.comment}
                          onTextChange={(text) => {
                            changeTextData(text, "comment");
                          }}
                          multiline
                          rows={3}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
            {/* <div className={styles.plainPaper}> */}
              <div className={styles.newContainer}>
                <div className={styles.headings}>Comments/Notes</div>
                <div className={styles.commentContainer}>
                  {relievingExpDetails?.comments &&
                    relievingExpDetails?.comments?.map((item) => (
                      <div className={styles.commentwrap}>
                        {(item?.status || item?.panelist_role) && (
                          <div
                            style={{ marginTop: "5px", marginBottom: "5px" }}
                          >
                            <span style={{ fontWeight: "600" }}>
                              {removeUnderScore(item?.panelist_role)}
                            </span>
                            <span style={{ marginLeft: "10px" }}>
                              {
                                <StatusPill
                                  status={item?.status}
                                  style={{ border: "none" }}
                                />
                              }
                            </span>
                          </div>
                        )}
                        {item?.status !== "WAITING" &&
                          item?.status !== "PENDING" && (
                            <>
                              <div>{item?.comment}</div>
                              <div className={styles.commentDate}>
                                {`${item?.employee?.name} (${item?.employee?.code}) | ${item?.updatedAtText}`}
                              </div>
                            </>
                          )}
                      </div>
                    ))}
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className={styles.approveContainer}>
        {relievingExpDetails?.experienceLetter?.status === "PENDING" &&
          relievingExpDetails?.status === "PENDING" && (
            <ButtonBase
              onClick={() => handleSubmitToApprove()}
              className={styles.approvebutton}
            >
              SEND FOR APPROVAL
            </ButtonBase>
          )}

        {relievingExpDetails?.experienceLetter?.status === "SITE_HR_APPROVED" &&
          relievingExpDetails?.status === "PENDING" && (
            <ButtonBase
              onClick={() => handleSubmitToApprove()}
              className={styles.approvebutton}
            >
              APPROVE AND GENERATE
            </ButtonBase>
          )}
      </div>
    </div>
  );
}

export default RelievingExpLetterDetail;
