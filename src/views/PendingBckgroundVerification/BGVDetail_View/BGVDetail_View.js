import { ButtonBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";
import StatusPill from "../../../components/Status/StatusPill.component";
import { serviceEmployeeBGVDetail } from "../../../services/PendingBGVerification.service";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SnackbarUtils from "../../../libs/SnackbarUtils";

const BGVDetailView = ({}) => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    //  setIsLoading(true);
    serviceEmployeeBGVDetail({ id: id }).then((res) => {
      if (!res.error) {
        const data = res?.data;

        setDetails({
          ...details,
          is_education_verification_status:
            data?.is_education_verification_status,
          is_first_employment_verification_status:
            data?.is_first_employment_verification_status,
          is_secound_employment_verification_status:
            data?.is_secound_employment_verification_status,
          is_criminal_verification_status:
            data?.is_criminal_verification_status,
          bgv_status: data?.bgv_status,
          bgv_result: data?.bgv_result,
          payment_status: data?.payment_status,
          paymentCompleteText: data?.paymentCompleteText,
          billing_to: data?.billing_to,
          cost: data?.cost,
          choose_action: data?.choose_action,
          remark: data?.remark,
          emp_code: data?.employeeObj?.emp_code,
          action_remark: data?.action_remark,
        });
      } else {
        SnackbarUtils.error(res.message);
      }
      // setIsLoading(false);
    });
  }, [id]);

  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };

  const getBgvStatusStyle = (bgvResult) => {
   
    if (bgvResult === "IN PROCESS") {
      return {color: "#F4881B", borderColor: "#F4881B" };
    } else if (bgvResult === "UNABLE TO VERIFY") {
      return {color: "#7467F0", border: "none", textAlign: "justify" };
    } else if (bgvResult === "FAILED") {
      return {color: "#E92828", borderColor: "#E92828" };
    } else if (bgvResult === "INCOMPLETE") {
      return {color: "#E92828", borderColor: "#E92828" };
    }

    return {};
  };

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Background Verification Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <CandidateInfor empId={details?.emp_code} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <h3>Background Verification Status</h3>
          <div className={styles.mainFlex}>
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Education: </div>
                <div className={styles.titleFiledSpacePil}>
                  {details?.is_education_verification_status ? 
                  <StatusPill
                    status={removeUnderScore(
                      details?.is_education_verification_status
                    )}
                    style={getBgvStatusStyle(
                      removeUnderScore(
                        details?.is_education_verification_status
                      )
                    )}
                  /> : "-" }
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>2nd Employment:</div>
                <div className={styles.titleFiledSpacePil}>
                  { details?.is_secound_employment_verification_status ? 
                  <StatusPill
                    status={removeUnderScore(
                      details?.is_secound_employment_verification_status
                    )}
                    style={getBgvStatusStyle(
                      removeUnderScore(
                        details?.is_secound_employment_verification_status
                      )
                    )}
                  /> : "-" }
                </div>
              </div>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>1st Employment:</div>
                <div className={styles.titleFiledSpacePil}>
                  {details?.is_first_employment_verification_status ? 
                  <StatusPill
                    status={removeUnderScore(
                      details?.is_first_employment_verification_status
                    )}
                    style={getBgvStatusStyle(
                      removeUnderScore(
                        details?.is_first_employment_verification_status
                      )
                    )}
                  /> : "-" }
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>Criminal:</div>
                <div className={styles.titleFiledSpacePil}>
                  {details?.is_criminal_verification_status ?
                  <StatusPill
                    status={removeUnderScore(
                      details?.is_criminal_verification_status
                    )}
                    style={getBgvStatusStyle(
                      removeUnderScore(details?.is_criminal_verification_status)
                    )}
                  /> : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.requiredFooter}>
            <div className={styles.topText}>
              <b>BGV Status: {removeUnderScore(details?.bgv_status)}</b>
            </div>
            <div className={styles.topText}>
              <b>BGV Result: {removeUnderScore(details?.bgv_result)}</b>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <h3>Required Action Details</h3>
          <div className={styles.mainFlex}>
            <div className={styles.backgroundStatus}>
              <span>
                {" "}
                <b>Action Choosen: {"  "} </b>{" "}
                {removeUnderScore(details?.choose_action)}{" "}
              </span>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <span>
                <b>Remarks: </b> {details?.action_remark}
              </span>
            </div>
          </div>
          <div className={styles.gaps} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <h3>Payment Details</h3>
          <div className={styles.mainFlex}>
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>
                  <b>Cost: </b>
                </div>
                <div className={styles.titleFiledSpacePil1}>
                  ₹ {details?.cost}
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>
                  <b>Billing To: </b>
                </div>
                <div className={styles.titleFiledSpacePil1}>
                  {details?.billing_to}
                </div>
              </div>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>
                  <b>Payment Status: </b>
                </div>
                <div className={styles.titleFiledSpacePil1}>
                  {details?.payment_status}
                </div>
              </div>
              <div className={styles.getfiledSpace}>
                <div className={styles.titleFiledSpace}>
                  <b>Completed In: </b>
                </div>
                <div className={styles.titleFiledSpacePil1}>
                  {details?.paymentCompleteText}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={"formFlex"}>
            <div style={{ color: "#161616", fontSize: "15px" }}>
              <b> Remarks</b>
            </div>
          </div>
          <p
            style={{
              color: "#161616",
              fontFamily: "normal normal normal 14px/32px Montserrat",
              fontSize: "13px",
            }}
          >
            {details?.remark}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BGVDetailView;
