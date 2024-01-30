import { Button, ButtonBase, Dialog, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import ActionButton from "../../components/ActionButton/ActionButton";
import StatusPill from "../../components/Status/StatusPill.component";
import styles from "./UpperInfo.module.css";
import { InfoOutlined, RepeatRounded } from "@material-ui/icons";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const UpperInfo = ({
  data,
  handleToggle,
  handleStatusToggle,
  isAdmin,
  isNew,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }


  const PopupComponent = () => {

    return (
      <div>
        <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
          <div className={styles.GeneralInfoWrapeer}>
            <div className={styles.alignDataToWrapper}>
              <div>
                <span className={styles.title}>General Information</span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                It is very important to note that Personal Information of employee and their family members is a complete responsibility of employee. Employee holds complete right to amend the same as per situation with employee. Group entitlements of employees and his/her family (for example- Group Medi claim, Group term insurance or other related coverages) depend on fact that employee has accurately maintained/updated his/her personal data on SkyNet. Organization do not scrutinize or interfere with personal information of employees. Organization is free of any responsibility or liability, if any insurance claim of any employee gets rejected due to inaccurate/old/obsolete personal data maintained by employee on SkyNet.
              </p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  return (
    <div>

      <div className={styles.blueBackground}>
        <div className={styles.iconPositionResponsive}>
          <InfoOutlined fontSize={"small"} style={{ color: "white" }} onClick={handleOpen} />
        </div>

        {
          open && <PopupComponent />
        }
        <div className={styles.innerContainer}>
          <div>
            <img src={data?.image} height={100} className={styles.imageContainer} />
          </div>
          <div className={styles.containerDataValue}>
            <div style={{ display: "flex", marginTop: "10px" }} className={styles.upperCardWidthData}>
              <div className={styles.profileInfo}>
                <div className={styles.nameCap}>{data?.name?.toLowerCase()}</div>
                <div>{data?.designation?.name}</div>
                <div>Employee Code: {data?.emp_code}</div>
              </div>
              <div className={styles.vertical}></div>
              <div className={styles.rightInfo}>
                <div className={styles.rightPartContainer}>
                  <span className={styles.location}>Location</span>
                  {data?.location?.name}
                </div>
                <div className={styles.rightPartContainer}>
                  <span className={styles.location}>Department</span>
                  {data?.department?.name}
                </div>
                <div className={styles.rightPartContainer}>
                  <span className={styles.location}>Sub-Department</span>{" "}
                  {data?.sub_department?.name}
                </div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:'center'}}>
            {isAdmin && (
              <div className={styles.statusWrap}>
                <StatusPill
                  status={data?.status}
                // style={{ color: "#fff", borderColor: "#fff" }}
                />
              </div>
            )}
            </div>
          </div>
          <div className={styles.btnWrap}>
           
            {isAdmin && (
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
            )}
          </div>
          <div className={styles.btnWrap2}>
            {isAdmin && (
              <div className={styles.actionWrap2}>
                <div className={styles.btnContainerMobile}>
                  <div className={styles.btnUpper2}>
                    <ActionButton onClick={handleStatusToggle}>
                      <InfoOutlined fontSize={"small"} />
                      <span className={styles.actionBtnSpan2}>Update Status</span>
                    </ActionButton>
                  </div>
                  <div className={styles.btnUpper2}>
                    <ActionButton onClick={handleToggle}>
                      <RepeatRounded fontSize={"small"} />
                      <span className={styles.actionBtnSpan2}>Reset Password</span>
                    </ActionButton>
                  </div>
                </div>
                <div className={styles.btnUpper2} id={styles.btnIdentityData}>
                  <ActionButton
                    onClick={() => {
                      historyUtils.push(
                        `${RouteName.EMPLOYEE_UPDATE}${data?.id}`
                      );
                    }}
                  >
                    <RepeatRounded fontSize={"small"} />
                    <span className={styles.actionBtnSpan2}>Edit</span>
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
          <div id={styles.desktopView}>
            <ActionButton
              onClick={() => {
                historyUtils.push(`${RouteName.MY_PROFILE_UPDATE}`);
              }}
            >
              <RepeatRounded fontSize={"small"} />
              <span className={styles.actionBtnSpan2}>Edit</span>
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperInfo;
