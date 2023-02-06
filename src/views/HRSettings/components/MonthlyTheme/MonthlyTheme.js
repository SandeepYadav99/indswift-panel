import React from "react";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import MonthlyThemeHook from "./MonthlyThemeHook";
import styles from "./Style.module.css";
import csx from "classnames";
import File from "../../../../components/FileComponent/FileComponent.component";

function MonthlyTheme() {
  const {
    error,
    handleSubmit,
    handleChange,
    document,
    getImageUrl,
    isSubmitting,
    coverImage,
    handleCoverImageChange,
  } = MonthlyThemeHook({});
  const months = ["January"];
  return (
    <div className={styles.monthlyThemeWrapper}>
      {months.map((item) => (
        <>
          <div className={styles.themecontainer}>
            <div className={csx("flex", styles.btnContainer)}>
              <File
                // imageClass={styles.inputFileUploader}
                max_size={5 * 1024 * 1024}
                type={["png", "jpeg", "jpg"]}
                fullWidth={true}
                name="document"
                accept={"image/*"}
                label="Please Upload Image"
                default_image={
                  coverImage
                  // coverImage ? coverImage : EMPLOYEE_INDUCTION?.cover_image
                }
                show_image={true}
                error={error}
                // title={"image"}
                value={coverImage}
                // handleChange={this._handleFileChange}
                placeholder={"Induction Booklet Document"}
                onChange={(file) => {
                  if (file) {
                    handleCoverImageChange(file);
                  }
                }}
              />
            </div>
            <div className={styles.monthWrapper}>
              <span>{item}</span>
            </div>
            <div className={"formGroup1"}>
              <CustomTextField
                multiline
                // isError={errorData?.name}
                // errorText={errorData?.name}
                label={"Theme"}
                value="Better Environment, Better Tomorrow. Save The Planet Earth."
                // onTextChange={(text) => {
                //   changeTextData(text, "name");
                // }}
                // onBlur={() => {
                //   onBlurHandler("name");
                // }}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default MonthlyTheme;
