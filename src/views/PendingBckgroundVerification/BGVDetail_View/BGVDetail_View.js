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
        console.log(data);
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
        });
      } else {
        SnackbarUtils.error(res.message);
      }
      // setIsLoading(false);
    });
  }, [id]);

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
      <CandidateInfor data={{}} />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <h3>Background Verification Status</h3>
          <div className={styles.mainFlex}>
            <div className={styles.backgroundStatus}>
              <span>
                Education:{" "}
                <StatusPill
                  status={details?.is_education_verification_status}
                />
              </span>
              <span>
                2nd Employment:
                <StatusPill
                  status={details?.is_secound_employment_verification_status}
                />
              </span>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <span>
                1st Employment:
                <StatusPill
                  status={details?.is_first_employment_verification_status}
                />
              </span>
              <span>
                Criminal:
                <StatusPill status={details?.is_criminal_verification_status} />
              </span>
            </div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.requiredFooter}>
            <div className={styles.topText}>
              <b>BGV Status: {details?.bgv_status}</b>
            </div>
            <div className={styles.topText}>
              <b>BGV Result: {details?.bgv_result}</b>
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
              <span>Action Choosen:   <b>{details?.choose_action}</b>  </span>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <span>Remarks: <b>{details?.remark}</b></span>
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
              <span>Cost: <b>{details?.cost}</b></span>
              <span>Billing To: <b>{details?.billing_to}</b></span>
            </div>
            <div className={styles.gaps} />
            <div className={styles.backgroundStatus}>
              <span>Payment Status: <b>{details?.payment_status}</b></span>
              <span>Completed In: <b>{details?.paymentCompleteText}</b></span>
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
            Any Remarks added while sending BGV form will be shown here
          </p>
        </div>
      </div>
    </div>
  );
};

export default BGVDetailView;
