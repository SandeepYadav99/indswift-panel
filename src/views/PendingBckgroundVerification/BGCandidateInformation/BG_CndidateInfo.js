import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import BGVDetails from "../BGVerificationForm/BGVForm";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";


const CandidateInformation = () => {
 
  const urlParams = new URLSearchParams(window.location.search);
  const empCode = urlParams.get('emp_code');
  
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
      <CandidateInfor empId={empCode} />
      <BGVDetails />
    </div>
  );
};

export default CandidateInformation;
