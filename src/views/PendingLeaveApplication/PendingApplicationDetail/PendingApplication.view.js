import React, { useState, useEffect } from "react";
import styles from "./Styled.module.css";
import { ButtonBase, MenuItem } from "@material-ui/core";
import ClaimUpperCard from "../../ClaimsManagement/ClaimsDetail/components/ClaimUpperCard/ClaimUpperCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import usePendingApplication from "./PendingApplication.hook";
import { servicesLeaveDetailApprove } from "../../../services/Leave.service";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ApprovePopUp = ({ handleClose, open, onChange, value }) => {
  const { handleSubmit, id } = usePendingApplication({});
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="p"
            component="div"
            className={styles.closeIcon}
            onClick={handleClose}
          >
            x
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={styles.headerModal}
          >
            Confirm Action
            <div className={styles.newLine} />
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 6 }}
            className={styles.headerModal}
          >
            Do you approve the leave application?{" "}
          </Typography>
          <CustomTextField
            label={"Add comments "}
            onChange={onChange}
            value={value}
            multiline
            rows={3}
          />{" "}
          <div className={styles.marginCheckbox}>
            <input
              type="checkbox"
              defaultChecked={checked}
              value={checked}
              onChange={() => setChecked(true)}
            />
            I approve of the information and action.
          </div>
          <div className={styles.alignButtonEnd}>
            <ButtonBase className={"createBtn"} onClick={handleSubmit}>
              Submit
            </ButtonBase>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const PendingApplication = () => {
  const [detailData, setDetailData] = useState();

  const {
    handleReject,
    open,
    handleOpen,
    handleOnChange,
    comment,
    handleClose,
    id,
  } = usePendingApplication({});

  useEffect(() => {
    const response = servicesLeaveDetailApprove({ id }).then((res) =>
      setDetailData(res.data.details)
    );
    return setDetailData(response);
  }, [id]);

  return (
    <div className={styles.container}>
      <div>
        <ButtonBase onClick={() => history.goBack()}>
          <ArrowBackIosIcon fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b>Leave Detail</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <br />
      <ClaimUpperCard data={detailData?.leave?.employee} />
      <div className={styles.plainPaper}>
        <span className={styles.headingDetails}>
          <b>Leave Detail</b>
        </span>
        {detailData?.leave?.type === "PATERNITY_LEAVE" ? (
          <div className={styles.divider}>
            <div className={styles.columnOne}>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Leave Type:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.type}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Child:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.child}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>No. of Days:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.duration_days}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Pending Leaves:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.leaveCount?.pending_leave}
                </span>
              </div>
            </div>
            <div className={styles.columnOne}>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Type of Event:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.event_type}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Leave Dates:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.startDateText}-
                  {detailData?.leave?.endDateText}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Applied On:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.createdAtText}
                </span>
              </div>
              <div className={styles.marginEqual}>
                {detailData?.leave?.document ? (
                  <span className={styles.adjustFont}>
                    <a href={detailData?.leave?.document}>View Attachment</a>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : detailData?.leave?.type === "OCCASION_LEAVE" ? (
          <div className={styles.divider}>
            <div className={styles.columnOne}>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Leave Type:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.type}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Leave Choosen:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.duration}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Applied On:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.createdAtText}
                </span>
              </div>
              {detailData?.details?.leave?.document ? (
                <span className={styles.adjustFont}>
                  <a href={detailData?.leave?.document}>View Attachment</a>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className={styles.columnOne}>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Event:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.event_type}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Leave Dates:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.startDateText}-
                  {detailData?.leave?.endDateText}
                </span>
              </div>
              <div className={styles.marginEqual}>
                <span className={styles.adjustFont}>Pending Leaves:</span>
                <span className={styles.textFont}>
                  {detailData?.leave?.leaveCount?.pending_leave}
                </span>
              </div>
            </div>
          </div>
        ) : (
          detailData?.leave?.type === "FACILITATION_LEAVE" ||
          (detailData?.leave?.type === "BEREAVEMENT_LEAVE" && (
            <div className={styles.divider}>
              <div className={styles.columnOne}>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>Leave Type:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.type}
                  </span>
                </div>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>Leave Dates:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.child}
                  </span>
                </div>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>Applied On:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.duration_days}
                  </span>
                </div>
                {detailData?.details?.leave?.document ? (
                  <span className={styles.adjustFont}>
                    <a href={detailData?.leave?.document}>View Attachment</a>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.columnOne}>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>Reason for leave:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.event_type}
                  </span>
                </div>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>No. of Days:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.startDateText}-
                    {detailData?.leave?.endDateText}
                  </span>
                </div>
                <div className={styles.marginEqual}>
                  <span className={styles.adjustFont}>Pending Leaves:</span>
                  <span className={styles.textFont}>
                    {detailData?.leave?.leaveCount?.pending_leave}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.plainPaper}>
        {" "}
        <span className={styles.headingDetails}>
          <b>Comments/Notes</b>
        </span>
        <div className={styles.divider}>
          <div className={styles.columnOne}>
            <span className={styles.textFont}>{detailData?.status}</span>
            <span className={styles.textFont}>{detailData?.comment}</span>
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <ButtonBase className={styles.rejectButton} onClick={handleReject}>
          Reject
        </ButtonBase>
        <ButtonBase className={"createBtn"} onClick={handleOpen}>
          Approve
        </ButtonBase>
      </div>
      <ApprovePopUp
        open={open}
        onChange={handleOnChange}
        value={comment}
        handleClose={handleClose}
      />
    </div>
  );
};

export default PendingApplication;
