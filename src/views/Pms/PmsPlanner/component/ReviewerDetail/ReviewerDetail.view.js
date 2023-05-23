import React from "react";
import styles from "./Style.module.css";
import DefaultImg from "../../../../../assets/img/download.png";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";

function ReviewerDetail() {
  return (
    <div className={styles.detailWrap}>
      <div className={styles.selfWrap}>
        <span className={styles.title}>SELF</span>
        <ProfileView isSelf={true} />
      </div>
      <div className={styles.peerWrap}>
        <div className={styles.addWrap}>
          <div className={styles.title}>PEERS</div>
          <ButtonBase
            className={styles.edit}
            //   onClick={() => { }}
          >
            <Add fontSize={"small"}></Add>
            ADD
          </ButtonBase>
        </div>
        <ProfileView />
      </div>
      <div className={styles.peerWrap}>
        <div className={styles.addWrap}>
          <div className={styles.title}>SUBORDINATES</div>
          <ButtonBase
            className={styles.edit}
            //   onClick={() => { }}
          >
            <Add fontSize={"small"}></Add>
            ADD
          </ButtonBase>
        </div>
        <ProfileView />
      </div>
      <div className={styles.btnWrap}>
            <ButtonBase
              aria-haspopup="true"
            //   onClick={handleCsvDownload}
              className={"createBtn"}
            >
              SAVE PANEL
            </ButtonBase>
          </div>
    </div>
  );
}

export default ReviewerDetail;

const ProfileView = ({ isSelf }) => {
  return (
    <div>
      <div className={styles.mappedCard} key={`SummaryView}`}>
        <div className={styles.imageNameContainer}>
          <div className={styles.imageContainer}>
            <img src={DefaultImg} />
          </div>

          <div className={styles.nameContainer}>
            <span>aman deep </span>
            <div className={styles.date}>7787887</div>
          </div>
          <div className={styles.errorCont}>
            <span className={styles.errorText}>Error! Already Added</span>
          </div>
        </div>
        {!isSelf && (
          <div className={styles.buttonWrapper}>
            <div className={styles.removeBtn}>Remove</div>
          </div>
        )}
      </div>
    </div>
  );
};
