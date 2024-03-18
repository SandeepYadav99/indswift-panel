import {Dialog,} from "@material-ui/core";
import React, {useState} from "react";
import StatusPill from "../../components/Status/StatusPill.component";
import styles from "./UpperInfoNewEmployee.module.css";
import {InfoOutlined} from "@material-ui/icons";
import {useLocation} from "react-router-dom/cjs/react-router-dom.min";

const UpperInfoNewEmployee = ({
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
    };

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
                  It is very important to note that Personal Information of
                  employee and their family members is a complete responsibility
                  of employee. Employee holds complete right to amend the same as
                  per situation with employee. Group entitlements of employees and
                  his/her family (for example- Group Medi claim, Group term
                  insurance or other related coverages) depend on fact that
                  employee has accurately maintained/updated his/her personal data
                  on SkyNet. Organization do not scrutinize or interfere with
                  personal information of employees. Organization is free of any
                  responsibility or liability, if any insurance claim of any
                  employee gets rejected due to inaccurate/old/obsolete personal
                  data maintained by employee on SkyNet.
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      );
    };

    const location = useLocation();

    const pathUrl = location?.pathName;

    return (
      <div>
        <div className={styles.blueBackground}>
          <div className={styles.iconPositionResponsive}>
            <InfoOutlined
              fontSize={"small"}
              style={{ color: "white" }}
              onClick={handleOpen}
            />
          </div>

          {open && <PopupComponent />}
          <div className={styles.innerContainer}>
            <div>
              <img
                src={data?.image}
                height={100}
                className={styles.imageContainer}
              />
            </div>
            <div className={styles.containerDataValue}>
              <div
                style={{ display: "flex", marginTop: "10px" }}
                className={styles.upperCardWidthData}
              >
                <div className={styles.profileInfo}>
                  <div className={styles.nameCap}>
                    {data?.name?.toLowerCase()}
                  </div>
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.statusWrap}>
                  <StatusPill status={data?.status} />
                </div>
              </div>
            </div>
            <div id={styles.desktopView}>
              <div id={styles.iconStatusImage}>
                <StatusPill status={data?.status} />
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UpperInfoNewEmployee;
