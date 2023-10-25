import Reacts from "react";
import styles from "./Style.module.css";
import { ButtonBase, IconButton, Menu, MenuItem } from "@material-ui/core";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import classnames from "classnames";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import WaitingComponent from "../../../components/Waiting.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import StatusPill from "../../../components/Status/StatusPill.component";

import useBackgroundVerification_Hook from "./BackgroundVerification_Hook";
import { EditOutlined } from "@material-ui/icons";

const BackgroundVerificationDetails = () => {
  const {
    data,
    isLoading,
    id,
    isInterviewStatus,
    handleChangeInterviewStatus,
    handleViewEditDetails,
  } = useBackgroundVerification_Hook({});
  if (isLoading) {
    return <WaitingComponent />;
  }
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
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>
              Background Verification Details
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div>
                <div className={"formGroup"}>
                  <CustomCheckbox
                    color={"primary"}
                    // handleChange={(text) => {
                    //   setSelectEvent((e) => !e);
                    // }}
                    label={"Education"}
                    // checked={selectEvent}
                  />
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  <CustomCheckbox
                    color={"primary"}
                    // handleChange={(text) => {
                    //   setSelectEvent((e) => !e);
                    // }}
                    label={"1st Employment"}
                    // checked={selectEvent}
                  />
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  <CustomCheckbox
                    color={"primary"}
                    // handleChange={(text) => {
                    //   setSelectEvent((e) => !e);
                    // }}
                    label={"2nd Employment"}
                    // checked={selectEvent}
                  />
                </div>
              </div>
              <div>
                <div className={"formGroup"}>
                  <CustomCheckbox
                    color={"primary"}
                    // handleChange={(text) => {
                    //   setSelectEvent((e) => !e);
                    // }}
                    label={"Criminal"}
                    // checked={selectEvent}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"} style={{display:"flex",gap:"10px", justifyContent:"space-between", alignItems:"center"}}>
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Cost"}
                // value={form?.name}
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                onBlur={() => {
                  // onBlurHandler("name");
                }}
              />
              <div>
                <IconButton
                  className={"tableActionBtn"}
                  color="secondary"
                  // disabled={isCalling}
                  onClick={() => {
                    //  handleViewDetails(all);
                  }}
                >
                  <EditOutlined fontSize={"small"} />
                </IconButton>
              </div>
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Billing to"}
                // value={form?.name}
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                onBlur={() => {
                  // onBlurHandler("name");
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.description}
                // errorText={errorData?.description}
                label={"Any Remarks"}
                // value={form?.description}
                onTextChange={(text) => {
                  // changeTextData(text, "description");
                }}
                onBlur={() => {
                  // onBlurHandler("description");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <CandidatePaperComponent isRecurring={data?.is_recurring} jobId={id} status={data?.status}/>
      <InterviewerListComponent jobId={id} isInterviewStatus={isInterviewStatus} handleChangeInterviewStatus={handleChangeInterviewStatus} status={data?.status}/>
      {data?.is_recurring && (<VacanciesList jobId={id} prc={data.code}/>)} */}
    </div>
  );
};

export default BackgroundVerificationDetails;
