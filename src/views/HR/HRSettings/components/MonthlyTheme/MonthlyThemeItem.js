import React, {useMemo} from 'react';
import styles from "./Style.module.css";
import csx from "classnames";
import File from "../../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useMonthlyThemeItem from "./MonthlyThemeItem.hook";


const MonthlyThemeItem = ({month, index, data}) => {
    const { coverImage, error, title, handleCoverImageChange, handleTextChange } = useMonthlyThemeItem({month, index, data});
    const image = useMemo(() => {
        return ( <File
            // imageClass={styles.inputFileUploader}
            max_size={5 * 1024 * 1024}
            type={["png", "jpeg", "jpg"]}
            fullWidth={true}
            name="document"
            accept={"image/*"}
            label="Please Upload Image"
            default_image={coverImage ? coverImage : data?.cover_image}
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
        />);
    }, [coverImage, data, handleCoverImageChange])
  return (
      <div className={styles.themecontainer}>
          <div className={csx("flex", styles.btnContainer)}>
              {image}
          </div>
          <div className={styles.monthWrapper}>
              <span>{month}</span>
          </div>
          <div className={"formGroup1"}>
              <CustomTextField
                  multiline
                  // isError={errorData?.name}
                  // errorText={errorData?.name}
                  rows={3}
                  label={"Theme"}
                  value={title}
                  onTextChange={(text) => {
                    handleTextChange(text, "name");
                  }}
                  // onBlur={() => {
                  //   onBlurHandler("name");
                  // }}
              />
          </div>
      </div>
  )
};

export default MonthlyThemeItem;
