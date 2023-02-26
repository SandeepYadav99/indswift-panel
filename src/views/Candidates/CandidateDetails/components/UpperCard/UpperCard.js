import { Button, ButtonBase } from "@material-ui/core";
import React from "react";

import styles from "./Style.module.css";
import { InfoOutlined, RepeatRounded } from "@material-ui/icons";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import ActionButton from "../../../../../components/ActionButton/ActionButton";
import DefaultImg from "../../../../../assets/img/download.png"
const UpperCard = ({ data, handleToggle, handleStatusToggle }) => {
  const splitDate = (value) => {
    return value ? value.split(" ")[0] : "";
  };
  return (
    <div>
      <div className={styles.blueBackground}>
        <div className={styles.innerContainer}>
          <div>
            <img src={data?.image ? data?.image:DefaultImg} height={70} />
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
              <StatusPill
                status="ACTIVE"
                style={{ color: "#fff", borderColor: "#fff" }}
              />
            </div>
            <div className={styles.actionWrap}>
              <div className={styles.btnUpper}>
                <ActionButton onClick={handleStatusToggle}>
                  <InfoOutlined fontSize={"small"} />
                  <span className={styles.actionBtnSpan}>Update Status</span>
                </ActionButton>
              </div>
              <div className={styles.btnUpper}>
                <ActionButton onClick={handleToggle}>
                  <RepeatRounded fontSize={"small"} />
                  <span className={styles.actionBtnSpan}>Update PRC</span>
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperCard;
