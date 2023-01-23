import { ButtonBase, MenuItem, TextField } from "@material-ui/core";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import LogUtils from "../../../../libs/LogUtils";
import { isNum } from "../../../../libs/RegexUtils";
import styles from "../../Style.module.css";

const IncludeQualificationField = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
}) => {
  const [isProductDialog, setIsProductDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "quantity") {
      LogUtils.log("maxQty", data);
      if (!value || (isNum(value) && data.maxQty >= value)) {
        changeData(index, { [name]: value });
      }
    } else if (name === "price") {
      if (!value || isNum(value)) {
        changeData(index, { [name]: value });
      }
    } else {
      changeData(index, { [name]: value });
    }
  };
  const handleChangeValue = useCallback(
    (value, key) => {
      if (key === "sku") {
        changeData(index, {
          quantity: "",
          [key]: value,
          maxQty: value.quantity,
          price: value.variant_price,
        });
      } else {
        changeData(index, { [key]: value });
      }
    },
    [changeData, index]
  );

  const handleIsFeatured = (e) => {
    changeData(index, { [e.target.name]: !data.is_included });
  };

  const handleServiceChange = (e) => {
    const { value } = e.target;
  };

  const toggleProductDialog = useCallback(() => {
    setIsProductDialog((e) => !e);
    setSelectedProductId(data?.sku?.product_id);
    setSelectedVariantId(data?.sku?.variant_id);
  }, [setIsProductDialog, setSelectedProductId, data]);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.firstRow}>
        <div className={styles.flex1}>
        <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Qualification"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="10">10th</MenuItem>
            <MenuItem value="12">12th</MenuItem>
          </CustomSelectField>
        </div>
        <div className={styles.flex1}>
          <TextField
            error={errors?.name}
            onChange={handleChange}
            value={data?.name}
            fullWidth={true}
            name={"name"}
            margin={"dense"}
            variant={"outlined"}
            label={"Name of Degree/Specialization"}
          />
        </div>
        <div className={styles.flex1}>
          <TextField
            error={errors?.marks}
            onChange={handleChange}
            value={data?.marks}
            fullWidth={true}
            type={"number"}
            name={"marks"}
            margin={"dense"}
            variant={"outlined"}
            label={"Institute/University"}
          />
        </div>
        <div className={"textCenter"}>
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
      <div className={styles.firstRow}>
        <div className={styles.flex1}>
          <TextField
            error={errors?.name}
            onChange={handleChange}
            value={data?.name}
            fullWidth={true}
            name={"name"}
            margin={"dense"}
            variant={"outlined"}
            label={"Passing Year"}
          />
        </div>
        <div className={styles.flex1}>
          <TextField
            error={errors?.name}
            onChange={handleChange}
            value={data?.name}
            fullWidth={true}
            name={"name"}
            margin={"dense"}
            variant={"outlined"}
            label={"Percentage/CCPA"}
          />
        </div>
        <div className={styles.flex1}>
        <CustomSelectField
            // isError={errorData?.vacancy_type}
            // errorText={errorData?.vacancy_type}
            label={"Degree Type"}
            // value={form?.vacancy_type}
            // handleChange={(value) => {
            //   changeTextData(value, "vacancy_type");
            // }}
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">PartTime</MenuItem>
          </CustomSelectField>
        </div>
        <div className={styles.hideDiv}>
          <p>Remove</p>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default IncludeQualificationField;
