import { ButtonBase } from "@material-ui/core";
import React from "react";
import history from "../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import useLetterHeadCreate from "./LetterHeadCreate.hook";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import File from "../../../../components/FileComponent/FileComponent.component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
function LetterHeadCreate() {
  const {
    form,
    changeTextData,
    handleSubmit,
    isLoading,
    isSubmitting,
    errorData,
    editData,
  } = useLetterHeadCreate({});

  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={styles.value}>Create Letter Head</span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.value21}>Letter Head Details</div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Letter Head Name"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
            />
          </div>
        </div>
        <div className={styles.tagsWrap}>
          <div className={styles.headingWrap}>Letter Head Header Image</div>
          <div className={styles.desWrap}>
            <InfoOutlinedIcon color="#2896e9" fontSize="small" />
            Recommended Dimensions: 600px X 100px
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label=""
              accept={"application/pdf,application/msword,image/*"}
              link={editData?.header_image ? editData?.header_image : null}
              error={errorData?.header_image}
              value={form?.header_image}
              placeholder={"Upload Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "header_image");
                }
              }}
            />
          </div>
        </div>
        <div className={styles.tagsWrap}>
          <div className={styles.headingWrap}>Letter Head Footer Image</div>
          <div className={styles.desWrap}>
            <InfoOutlinedIcon color="#2896e9" fontSize="small" />
            Recommended Dimensions: 600px X 100px
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <File
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="image"
              label=""
              accept={"application/pdf,application/msword,image/*"}
              link={editData?.footer_image ? editData?.footer_image : null}
              error={errorData?.footer_image}
              value={form?.footer_image}
              placeholder={"Upload Image"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "footer_image");
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.status}>Status</div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
              }}
              label={`Active`}
            />
          </div>
          <div className={styles.btnCont}>
            <ButtonBase
              type={"button"}
              disabled={isLoading ? true : false}
              className={styles.createBtn}
              onClick={handleSubmit}
            >
              Submit
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterHeadCreate;
