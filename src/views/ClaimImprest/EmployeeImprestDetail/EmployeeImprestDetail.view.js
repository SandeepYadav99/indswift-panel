import React from "react";
import styles from "./Style.module.css";
import image from "../../../assets/img/download.png";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import useEmployeeImprestDetail from "./EmployeeImprestDetail.hook";
import ReturnEmpDialog from "../EmployeeImprest/component/ReturnEmpDialog/ReturnEmpDialog.view";
import AccountDialog from "../EmployeeImprest/component/AccountDialog/AccountDialog.view";
import { Add } from "@material-ui/icons";
import TravelTable from "../ImprestApprovalDetail/Component/TravelTable/TravelTable.component";
import OtherTable from "../ImprestApprovalDetail/Component/OtherTable/OtherTable.component";

function EmployeeImprestDetail() {
  const {
    id,
    employeeDetail,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    toggleExtendDialog,
    toggleTraineeDialog,
    isExtendDialog,
    isTraineeDialog,
    listData,
    typeData,
    handleCsvDownload
  } = useEmployeeImprestDetail({});
  return (
    <div>
      <div className={styles.headingWrap2}>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Employee Imprest Information</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <ReturnEmpDialog
        emp_id={employeeDetail?.employee_id}
        listData={listData}
        isOpen={isExtendDialog}
        handleToggle={toggleExtendDialog}
      />
      <AccountDialog
        emp_id={employeeDetail?.employee_id}
        listData={listData}
        isOpen={isTraineeDialog}
        handleToggle={toggleTraineeDialog}
      />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Employee Information</div>
            <div>
              <ButtonBase
                aria-owns={createDD ? "createDD" : undefined}
                aria-haspopup="true"
                onClick={handleAddCandidate}
                className={"createBtn"}
              >
                Add Record
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
              <Menu
                id="createDD"
                anchorEl={createDD}
                open={Boolean(createDD)}
                onClose={handleClosedownloadCL}
              >
                <MenuItem
                  onClick={() => {
                    toggleExtendDialog();
                  }}
                >
                  Employee Return
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toggleTraineeDialog();
                  }}
                >
                  Account Reconciliation
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left221}>
              <div>
                <img
                  className={styles.claimimg}
                  src={
                    employeeDetail?.employee?.image
                      ? employeeDetail?.employee?.image
                      : image
                  }
                />
              </div>
              <div>
                <div className={styles.key}>
                  <span className={styles.value}>Name:</span>
                  {employeeDetail?.employee?.name}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Employee ID:</span>
                  {employeeDetail?.employee?.emp_code}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Location:</span>
                  {employeeDetail?.employee?.location?.name}
                </div>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Designation:</span>
                {employeeDetail?.employee?.designation?.name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Grade/Cadre:</span>
                {employeeDetail?.employee?.grade?.code &&
                  `${employeeDetail?.employee?.grade?.code} / ${employeeDetail?.employee?.cadre?.code}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Department:</span>
                {employeeDetail?.employee?.department?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <div>
            <span>
              <b>Non Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
            </div>
            <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.download}
              onClick={()=>handleCsvDownload('OTHER')}
            >
              DOWNLOAD
            </ButtonBase>
          </div>
          </div>
            
          <div className={styles.experseWrap}>
            BALANCE :{` ₹ ${typeData?.other?.INR?.balance} `}
          </div>
        </div>
        <OtherTable jobId={employeeDetail?.employee?.id} Claimtype="OTHER" />
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.headingWrap}>
        <div className={styles.newLineWrap}>
            <div>
            <span>
              <b>Travel Imprest Ledger</b>
            </span>
            <div className={styles.newLine2} />
            </div>
            <div className={styles.rightFlex}>
            <ButtonBase
              className={styles.download}
              onClick={()=>handleCsvDownload('TRAVEL')}
            >
              DOWNLOAD
            </ButtonBase>
          </div>
          </div>
          <div className={styles.experseWrap}>
            BALANCE :{` ₹ ${typeData?.travel?.INR?.balance} |`}
            {` $ ${typeData?.travel?.USD?.balance} |`}
            {` € ${typeData?.travel?.EUR?.balance} `}
            {typeData?.expense_budget !== undefined &&
              ` EXPENSES : ${typeData?.expense_budget}`}
          </div>
        </div>
        <TravelTable jobId={employeeDetail?.employee?.id} Claimtype="TRAVEL" />
      </div>
    </div>
  );
}

export default EmployeeImprestDetail;
