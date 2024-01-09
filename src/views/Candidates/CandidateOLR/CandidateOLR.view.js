import { ButtonBase, Checkbox } from "@material-ui/core";
import React, { useCallback, useMemo, useEffect } from "react";
import styles from "./Style.module.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import historyUtils from "../../../libs/history.utils";
import CandidateDetails from "./components/CandidateDetails/CandidateDetails";
import ReplacementDetails from "./components/ReplacementDetails/ReplacementDetails";
import SalaryDetails from "./components/SalaryDetails/SalaryDetails";
import ApprovalDialog from "./components/ApprovalPopUp/ApprovalDialog.view";
import CandidateOLRHook from "./CandidateOLR.hook";
import RejectOLRDialog from "./components/RejectOLRPopUp/RejectOLRDialog.view";
import DataTables from "../../../components/Datatables/datatables";
import Constants from "../../../config/constants";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CheckOLRDialog from "./components/CheckOLRPopUP/CheckOLRDialog.view";
import StatusPill from "../../../components/Status/StatusPill.component";

function CandidateOLR({ location }) {
  const {
    isApprovalPopUp,
    toggleApprovalDialog,
    isRejectPopUp,
    toggleRejectDialog,
    data,
    id,
    isReview,
    isApproval,
    panelList,
    handleRowSize,
    handlePageChange,
    tableDataValue,
    handleApproveReview,
    isSubmitting,
    reviewId,
    isRecruiter,
    isChecked,
    role,
    toggleCheckDialog,
    isCheckPopUp,
    handleCheckboxChange,
  } = CandidateOLRHook({ location });

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();

        const content = document.getElementById("content-to-print");

        const canvas = await html2canvas(content);

        const pdf = new jsPDF("p", "mm", "a4");

        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);

        pdf.autoPrint();
        window.open(pdf.output("bloburl"), "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={styles.firstFieldWrapper}>
            <img className={styles.panelListImg} src={obj?.image} />
            <span>{obj?.name}</span>
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "APPROVING PERSON",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "designation",
        label: "DESIGNATION",
        sortable: false,
        render: (value, all) => <div>{all?.designation?.name}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT",
        sortable: false,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
    ];
  }, [panelList]);
  const tableData = useMemo(() => {
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: panelList,
      hidePagination: true,
    };
    return { datatable };
  }, [tableStructure, panelList]);
  return (
    <>
    <div className={"container"} id="content-to-print">
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem" }}>
            <b>Offer Letter Release Sheet</b>
          </div>
          <div className={styles.newLine} />
        </div>
      </div>
      <br />
      <CandidateDetails data={data} />
      <ReplacementDetails data={data} />
      <SalaryDetails data={data} />
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Recruiter Comments </div>
        <span className={styles.spanWrapper}>
          <span style={{ textTransform: "capitalize" }}>{data?.comment}</span>
        </span>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Reviewer Comments</div>
          <div className={styles.commentContainer}>
            {data?.reviews &&
              data?.reviews?.map((item) => (
                <div className={styles.commentwrap}>
                  {item?.status !== "WAITING" && item?.status !== "PENDING" && (
                    <>
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <span style={{ marginLeft: "10px" }}>
                          {
                            <StatusPill
                              status={item?.status}
                              style={{ border: "none" }}
                            />
                          }
                        </span>
                      </div>
                      <>
                        <div>{item?.note}</div>
                        <div className={styles.commentDate}>
                          {`${item?.employee?.name} (${item?.employee?.code}) | ${item?.updatedAtText}`}
                        </div>
                      </>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {isReview && (
        <div className={styles.plainPaper}>
          <div className={styles.heading}>Approval Authority</div>
          <div>
            <DataTables {...tableData.datatable} />
          </div>
        </div>
      )}
      <ApprovalDialog
        offerId={id}
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
      />
      <RejectOLRDialog
        reviewId={reviewId}
        isOpen={isRejectPopUp}
        handleToggle={toggleRejectDialog}
      />
      <CheckOLRDialog
        reviewId={reviewId}
        isOpen={isCheckPopUp}
        handleToggle={toggleCheckDialog}
        isChecked={isChecked}
      />
    </div>
          <div className={styles.btnContainerCheckBox}>
          {role === "CORPORATE_HR" && (
            <div className={styles.chkwrapp}>
              <Checkbox
                disabled={false}
                onChange={handleCheckboxChange}
                checked={isChecked}
                value="secondary"
                color="primary"
                size="small"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span className={styles.spanchk}>
                Hide Replacing Experience Detail
              </span>
            </div>
          )}
  
          {isReview && !isRecruiter && (
            <div className={styles.btnReviewWrapper}>
              <div className={styles.isReviewBtnContainer}>
                <ButtonBase
                  type={"button"}
                  onClick={toggleRejectDialog}
                  className={styles.RejectBtn}
                >
                  Reject
                </ButtonBase>
                <ButtonBase
                  type={"button"}
                  onClick={toggleCheckDialog}
                  className={styles.createBtn}
                  disabled={isSubmitting}
                >
                  Approve
                </ButtonBase>
              </div>
            </div>
          )}
  
          {isApproval && (
            <div className={styles.btnCont1}>
              <ButtonBase
                type={"button"}
                onClick={toggleApprovalDialog}
                className={styles.createBtn}
              >
                SHARE FOR APPROVAL
              </ButtonBase>
            </div>
          )}
        </div>
        </>
  );
}

export default CandidateOLR;
