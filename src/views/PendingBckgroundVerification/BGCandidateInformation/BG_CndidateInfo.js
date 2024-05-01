import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import BGVDetails from "../BGVerificationForm/BGVForm";
import CandidateInfor from "../component/CandidateInfor/CandidateInfor";


const CandidateInformation = ({location}) => {
 
  const urlParams = new URLSearchParams(window.location.search);
  const empCode = urlParams.get('emp_code');
  const isCLonePage=location?.state?.isClonePage ;
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
      <BGVDetails isCLonePage={isCLonePage}/>
    </div>
  );
};

export default CandidateInformation;
