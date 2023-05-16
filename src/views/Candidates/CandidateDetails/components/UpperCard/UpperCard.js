import React, {useCallback, useMemo, useState} from "react";
import styles from "./Style.module.css";
import { InfoOutlined, RepeatRounded } from "@material-ui/icons";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import ActionButton from "../../../../../components/ActionButton/ActionButton";
import DefaultImg from "../../../../../assets/img/download.png";
import ShareOfferDialog from "../ShareOfferPopUp/ShareOfferDialog.view";
import {useSelector} from "react-redux";
import Constants from "../../../../../config/constants";

const UpperCard = ({
  data,
  handleToggle,
  handleStatusToggle,
  handleOfferPage,
  handleToggleExtendPage,
  handleShare
}) => {
  const [isShareDialog, setIsShareDialog] = useState(false);
  const {user_profile, role} = useSelector(state => state.auth);
  const toggleShareDialog = useCallback(() => {
    setIsShareDialog((e) => !e);
  }, [isShareDialog]);

  const isRecruiter = useMemo(() => {
    const arr = [Constants.ROLES.RECRUITER, Constants.ROLES.CORPORATE_HR];
    // if (Constants.is_development) {
      arr.push(Constants.ROLES.ADMIN);
    // }
    return arr.indexOf(role) >= 0;
  }, [role]);

  const splitDate = (value) => {
    return value ? value.split(" ")[0] : "";
  };
  const removeUnderScore=(value)=>{
    return value ? value.replace(/_/g, " "): ""
  }
  const handlePRCPopUp=()=>{
    handleToggleExtendPage()
    /*if (data?.job_opening?.is_recurring){
      handleToggleRPDialog()
    }
    else{
      handleToggleExtendPage()
    }*/
  }
  return (
    <div>
      <div className={styles.blueBackground}>
        <div className={styles.innerContainer}>
          <div>
            <img src={data?.image ? data?.image : DefaultImg} height={70} />
          </div>
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
              {data?.referred_obj?.code && data?.referred_obj?.code !== 'N/A' ? ` (${data?.referred_obj?.code})` : ''}
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
          <div className={styles.btnWrap}>
            <div className={styles.statusWrap}>
              {(data?.status !== Constants.JOB_CANDIDATE_STATUS.DROPPED && isRecruiter && data?.is_selected && !data?.is_offer_letter_sent) && (<ActionButton onClick={() => handlePRCPopUp()}>
                <InfoOutlined fontSize={"small"} />
                <span className={styles.actionBtnSpan}>Extend Offer</span>
              </ActionButton>)}
              <div className={styles.statusWrapInner}>
                <StatusPill
                  status={removeUnderScore(data?.status)}
                  // style={{ color: "#fff", borderColor: "#fff" }}
                />
              </div>
            </div>
            <div className={styles.actionWrap}>
              <div className={styles.btnUpper}>
                {(isRecruiter && data?.is_offer_letter_approved && data?.status !=="DROPPED") && (<ActionButton onClick={toggleShareDialog}>
                  <InfoOutlined fontSize={"small"} />
                  <span className={styles.actionBtnSpan}>Share Offer</span>
                </ActionButton>)}
              </div>
              <div className={styles.btnUpper}>
               <ActionButton onClick={handleStatusToggle}>
                 <InfoOutlined fontSize={"small"} />
                 <span className={styles.actionBtnSpan}>Update Status</span>
               </ActionButton>
              </div>
              <div className={styles.btnUpper21}>
                <ActionButton onClick={handleToggle}>
                  <RepeatRounded fontSize={"small"} />
                  <span className={styles.actionBtnSpan}>Update PRC</span>
                </ActionButton>
              </div>
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
