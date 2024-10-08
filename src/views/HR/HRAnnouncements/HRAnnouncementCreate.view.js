import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useHRAnnouncementCreateViewDetail from "./HRAnnouncementCreateHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const HRAnnouncementCreateView = ({}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    isEdit,
    handleDelete,
    listData,
    handleReset,
    handleImageChange,
    image,
    id,
  } = useHRAnnouncementCreateViewDetail({});
  const classes = useStyles();
  const getImgUrl = (image) => {
    if (image) {
      if (typeof image === "object") {
        return URL.createObjectURL(image);
      } else {
        return image;
      }
    } else {
      return require("../../../assets/img/ic_announcement.png");
    }
  };
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span>
              <b>{id ? "Update" : "Create"} Announcement</b>
            </span>
          </ButtonBase>
          <div className={styles.newLines} />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Announcement Details</div>
          </h4>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.title}
              errorText={errorData?.title}
              label={"Title of Announcement"}
              value={form?.title}
              onTextChange={(text) => {
                changeTextData(text, "title");
              }}
              onBlur={() => {
                onBlurHandler("title");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"} id={styles.mobileResponsive}>
          <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Date"}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "date");
              }}
              value={form?.date}
              isError={errorData?.date}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.link}
              errorText={errorData?.link}
              label={"Link"}
              value={form?.link}
              onTextChange={(text) => {
                changeTextData(text, "link");
              }}
              onBlur={() => {
                onBlurHandler("link");
              }}
            />
          </div>
        </div>
        <div className={styles.imageUploaderWrapper}>
          <div className={styles.titleWrapper}>
            <span>Upload Image</span>
            <img className={styles.applicationImage} src={getImgUrl(image)} />
          </div>
          <ButtonBase className={styles.edit}>
            <label
              htmlFor="imageUploadAnnounce"
              className={styles.labelWrapper}
            >
              UPLOAD NEW IMAGE
            </label>
          </ButtonBase>
          <input
            type="file"
            id="imageUploadAnnounce"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={"plainPaper"}>
        <div className={"headerFlex wrapper"} id={styles.marginBottomTop}>
          <div className={"infoTitle inner"}>
            <div className="info_Status">
              <h4 className={"heading_stats"}>Status</h4>
              <div className={"slider_wrap "}>
                <p className="tags">Inactive</p>
                <CustomSwitch
                  value={form?.is_active}
                  handleChange={() => {
                    changeTextData(!form?.is_active, "is_active");
                  }}
                  label={`Active`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.btnCont}>
          {isLoading ? (
            <ButtonBase
              disabled={isSubmitting}
              type={"button"}
              onClick={handleSubmit}
              className={styles.createBtn}
            >
              <CircularProgress color="success" size="20px" />
            </ButtonBase>
          ) : (
            <ButtonBase
              disabled={isSubmitting}
              type={"button"}
              onClick={handleSubmit}
              className={styles.createBtn}
            >
              {id ? "Update" : "Create"}
            </ButtonBase>
          )}
        </div>
      </div>
    </div>
  );
};

export default HRAnnouncementCreateView;
