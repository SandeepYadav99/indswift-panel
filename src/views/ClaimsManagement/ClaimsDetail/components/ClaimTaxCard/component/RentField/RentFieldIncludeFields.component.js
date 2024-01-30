import React, { useMemo } from "react";
import { TextField, ButtonBase } from "@material-ui/core";
import styles from "./style.module.css";
import MultiFile from "../FileComponent/FileMultiComponent.component";
import { serviceUpdateFile } from "../../../../../../../services/ClaimsManagement.service";

const RentFieldIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      const fd = new FormData();
      e.forEach((item) => {
        fd.append("files", item);
      });
      let req = serviceUpdateFile(fd);
      req.then((res) => {
        const data = res?.data;
        changeData(index, { [fieldName]: [...data] });
      });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name === "amount") {
        if (value >= 0) {
          changeData(index, { [name]: value });
        }
      } else {
        changeData(index, { [name]: value });
      }
    }
  };
  const deleteImage = (e, fieldName) => {
    changeData(index, { [fieldName]: [...e] });
  };
  console.log("datatata", data);
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.landlord_name}
              onChange={handleChange}
              value={data?.landlord_name}
              fullWidth={true}
              name={"landlord_name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Landlord Name"}
            />
          </div>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.rent}
              onChange={handleChange}
              value={data?.rent}
              fullWidth={true}
              name={"rent"}
              margin={"dense"}
              variant={"outlined"}
              label={"Rent Paid"}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.landlord_address}
              onChange={handleChange}
              value={data?.landlord_address}
              fullWidth={true}
              name={"landlord_address"}
              margin={"dense"}
              variant={"outlined"}
              label={"Address of Landlord"}
            />
          </div>
          <div className={styles.formGrp}>
            <TextField
              error={errors?.landlord_pan}
              onChange={handleChange}
              value={data?.landlord_pan}
              fullWidth={true}
              name={"landlord_pan"}
              margin={"dense"}
              variant={"outlined"}
              label={"Landlord PAN"}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}>
            <MultiFile
              multiple
              max_size={10 * 1024 * 1024}
              type={["pdf", "jpeg", "doc", "docx", "jpg", "png"]}
              fullWidth={true}
              name="house_rent_evidence"
              label="Add Attachment"
              accept={"application/pdf,application/msword,image/*"}
              error={errors?.house_rent_evidence}
              value={data?.house_rent_evidence}
              placeholder={"Attach Evidence"}
              onChange={(file) => {
                handleChange(file, "house_rent_evidence");
              }}
              deleteImage={(file) => {
                deleteImage(file, "house_rent_evidence", index);
              }}
            />
          </div>
          <div className={styles.formGrp}></div>
        </div>

        <div className={styles.firstRow221}>
          <div className={styles.btnWrap}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentFieldIncludeFields;
