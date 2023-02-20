import { Button, ButtonBase } from "@material-ui/core";
import React from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import StatusPill from "../../components/Status/StatusPill.component";
import styles from "./Style.module.css";
import { InfoOutlined, RepeatRounded } from "@material-ui/icons";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const UpperInfo = ({ data, handleToggle,handleStatusToggle }) => {
  return (
    <div>
      <div className={styles.blueBackground}>
        <div className={styles.innerContainer}>
          <div>
            <img src={data?.image} height={70} />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>{data?.name}</div>
            <div>{data.designation}</div>
            <div>Employee Code: {data?.emp_code}</div>
          </div>
          <div className={styles.vertical}></div>
          <div className={styles.rightInfo}>
            <div>
              <span className={styles.location}>Location</span>{" "}
              {data?.location?.name}
            </div>
            <div>
              <span className={styles.location}>Department</span>
              {data?.department?.name}
            </div>
            <div>
              <span className={styles.location}>Sub-Department</span>{" "}
              {data?.sub_department?.name}
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
                  <span className={styles.actionBtnSpan}>Reset Password</span>
                </ActionButton>
              </div>
              <div className={styles.btnUpper}>
                <ActionButton
                  onClick={() => {
                    historyUtils.push(
                      `${RouteName.EMPLOYEE_UPDATE}${data?.id}`
                    );
                  }}
                >
                  <RepeatRounded fontSize={"small"} />
                  <span className={styles.actionBtnSpan}>Edit</span>
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperInfo;
