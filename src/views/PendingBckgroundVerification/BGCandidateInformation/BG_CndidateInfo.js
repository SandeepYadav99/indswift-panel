import Reacts from "react";
import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import useCandidateInformation_Hook from "./BG_CandidateInfo_Hook";
import BGVDetails from "../BGVerificationForm/BGVForm";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";

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
