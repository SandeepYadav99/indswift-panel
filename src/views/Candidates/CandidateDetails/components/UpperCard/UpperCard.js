import React, { useCallback, useMemo, useState } from "react";
import styles from "./Style.module.css";
import { Edit, InfoOutlined, RepeatRounded } from "@material-ui/icons";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import ActionButton from "../../../../../components/ActionButton/ActionButton";
import DefaultImg from "../../../../../assets/img/download.png";
import ShareOfferDialog from "../ShareOfferPopUp/ShareOfferDialog.view";
import { useSelector } from "react-redux";
import Constants from "../../../../../config/constants";
import RolesUtils from "../../../../../libs/Roles.utils";

const UpperCard = ({
  data,
  handleToggle,
  handleStatusToggle,
  handleOfferPage,
  handleToggleExtendPage,
  handleShare,
  checkPrc,
}) => {
  const [isShareDialog, setIsShareDialog] = useState(false);
  const { user_profile, role } = useSelector((state) => state.auth);
  const toggleShareDialog = useCallback(() => {
    setIsShareDialog((e) => !e);
  }, [isShareDialog]);

  const isRecruiter = useMemo(() => {
    return RolesUtils.canAccess([Constants.ROLES.RECRUITER, Constants.ROLES.CORPORATE_HR, Constants.ROLES.ADMIN], role);
  }, [role]);

  const splitDate = (value) => {
    return value ? value.split(" ")[0] : "";
  };
  const removeUnderScore = (value) => {
    return value ? value.replace(/_/g, " ") : "";
  };
  const handlePRCPopUp = () => {
    handleToggleExtendPage();
  };
  return (
    <div>
      <div className={styles.blueBackground}>
        <div className={styles.innerContainer}>
          <div>
            <img
              src={data?.image ? data?.image : DefaultImg}
              height={70}
              alt=""
            />
          </div>
          <div className={styles.statusMobileData}>
            <StatusPill
              status={removeUnderScore(data?.status)}
              // style={{ color: "#fff", borderColor: "#fff" }}
            />
          </div>{" "}
          <div className={styles.sub_conitainer}>
            <div className={styles.profileInfo}>
              <div className={styles.name}>{data?.name}</div>
              <div>{data?.email}</div>
              <div>{data?.contact}</div>
              <a target="_blank" href={data?.resume}>
                {" "}
                <span>View Resume</span>
              </a>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.rightInfo}>
              <div>
                <span className={styles.location}>Referred by:</span>{" "}
                {data?.referred_obj?.name}
                {data?.referred_obj?.code && data?.referred_obj?.code !== "N/A"
                  ? ` (${data?.referred_obj?.code})`
                  : ""}
              </div>
              <div>
                <span className={styles.location}>Date of Application:</span>
                {data?.appliedDateText}
              </div>
              <div>
                <span className={styles.location}>Updated On:</span>{" "}
                {splitDate(data?.updatedAtText)}
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            <div className={styles.statusWrap}>
              {data?.status !== Constants.JOB_CANDIDATE_STATUS.DROPPED &&
              isRecruiter &&
              data?.is_selected &&
              !data?.is_offer_letter_sent &&
              data?.status !== "SHORTLISTED" ? (
                <ActionButton
                  onClick={() => handlePRCPopUp()}
                  className={styles.actionButtonTranspent}
                >
                  <InfoOutlined fontSize={"small"} />
                  <span style={{ marginLeft: "5px" }}>Extend Offer</span>
                </ActionButton>
              ) : (
                <div />
              )}
              <div className={styles.statusWrapInner}>
                <StatusPill
                  status={removeUnderScore(data?.status)}
                  // style={{ color: "#fff", borderColor: "#fff" }}
                />
              </div>
            </div>
            <div className={styles.actionWrap}>
              <div className={styles.btnUpper}>
                {isRecruiter &&
                  data?.is_offer_letter_approved &&
                  data?.status !== "DROPPED" &&
                  data?.status !== "SHORTLISTED" && (
                    <ActionButton
                      onClick={toggleShareDialog}
                      className={styles.actionButtonTranspent}
                    >
                      <InfoOutlined fontSize={"small"} />
                      <span style={{ marginLeft: "2px" }}>Share Offer</span>
                    </ActionButton>
                  )}
              </div>
              <div>
                <ActionButton
                  onClick={handleStatusToggle}
                  className={styles.actionButtonTranspent}
                >
                  <InfoOutlined fontSize={"small"} />
                  <span style={{ marginLeft: "2px" }}>Update Status</span>
                </ActionButton>
              </div>
              {checkPrc && (
                <div className={styles.btnUpper}>
                  <ActionButton
                    onClick={handleToggle}
                    className={styles.actionButtonTranspent}
                  >
                    <Edit fontSize={"small"} />
                    <span style={{ marginLeft: "2px" }}>Update PRC</span>
                  </ActionButton>
                </div>
              )}
            </div>
          </div>
          <div className={styles.btnWrapMobile}>
            <div className={styles.btnResponsiveData}>
              <div>
                <ActionButton
                  onClick={handleStatusToggle}
                  className={styles.actionButtonTranspent}
                >
                  <InfoOutlined fontSize={"small"} />
                  <span style={{ marginLeft: "2px" }}>Update Status</span>
                </ActionButton>
              </div>
              {checkPrc && (
                <div className={styles.btnUpper}>
                  <ActionButton
                    onClick={handleToggle}
                    className={styles.actionButtonTranspent}
                  >
                    <Edit fontSize={"small"} />
                    <span style={{ marginLeft: "2px" }}>Update PRC</span>
                  </ActionButton>
                </div>
              )}
            </div>
            <div className={styles.btnWrapValueRes}>
              {data?.status !== Constants.JOB_CANDIDATE_STATUS.DROPPED &&
              isRecruiter &&
              data?.is_selected &&
              !data?.is_offer_letter_sent &&
              data?.status !== "SHORTLISTED" ? (
                <ActionButton
                  onClick={() => handlePRCPopUp()}
                  className={styles.actionButtonTranspent}
                >
                  <InfoOutlined fontSize={"small"} />
                  <span style={{ marginLeft: "5px" }}>Extend Offer</span>
                </ActionButton>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
      <ShareOfferDialog
        candidateStatus={data?.status}
        handleShare={handleShare}
        pdf={data?.offer_letter_path}
        offerId={data?.offer_id}
        candidateId={data?.id}
        isOpen={isShareDialog}
        handleToggle={toggleShareDialog}
      />
    </div>
  );
};

export default UpperCard;
