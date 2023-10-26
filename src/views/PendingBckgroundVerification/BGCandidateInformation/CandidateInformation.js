import Reacts from "react";
import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import useCandidateInformation_Hook from "./CandidateInformation_Hook";
import BGVDetails from "../BGVerificationDetails/BGVDetails";
import CandidateInfor from "../component/CandidateInfor";

const CandidateInformation = () => {
  const {
    data,
    isLoading,
    id,
    isInterviewStatus,
    handleChangeInterviewStatus,
    handleViewEditDetails,
  } = useCandidateInformation_Hook({});
  // if (isLoading) {
  //   return <WaitingComponent />;
  // }
  const valencyChange = (value) => {
    return value ? value.replace(/_/, " ") : "NA";
  };
  const styleRed = {
    color: "#ff4d4f",
    backgroundColor: "rgba(255,77,79,.06274509803921569)",
    border: "none",
  };
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>Background Verification Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <CandidateInfor data={data} />
      <BGVDetails />
    </div>
  );
};

export default CandidateInformation;
