import { ButtonBase,  TextField } from "@material-ui/core";

import React, {  useState, useCallback } from "react";

import styles from "../../Style.module.css";

const IncludSalaryField = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
  
  isDisabled
}) => {
  const [isProductDialog, setIsProductDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    changeData(index, { [name]: value });
  };

  const toggleProductDialog = useCallback(() => {
    setIsProductDialog((e) => !e);
    setSelectedProductId(data?.sku?.product_id);
    setSelectedVariantId(data?.sku?.variant_id);
  }, [setIsProductDialog, setSelectedProductId, data]);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.qualificationFormCont}>
        <div className={styles.firstRow}>
          <div className={styles.flex1} style={{ display: index !== 0 ? 'none' : 'block' }}>
             <TextField
                disabled={isDisabled ? true : false}
                error={errors?.ctc}
                onChange={handleChange}
                value={data?.ctc}
                fullWidth={true}
                name={"ctc"}
                margin={"dense"}
                variant={"outlined"}
                label={'CTC (per month)'}
                type={'number'}
            />
           
          </div>
          <div className={styles.flex1} style={{ display: index !== 0 ? 'none' : 'block' }}>
            <TextField
                disabled={isDisabled ? true : false}
                error={errors?.in_hand}
                onChange={handleChange}
                value={data?.in_hand}
                fullWidth={true}
                name={"in_hand"}
                margin={"dense"}
                variant={"outlined"}
                label={'In hand Salary (per month)'}
                type={'number'}
            />
          </div>
        </div>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextField
                disabled={isDisabled ? true : false}
                error={errors?.payment_type}
                onChange={handleChange}
                value={data?.payment_type}
                fullWidth={true}
                name={"payment_type"}
                margin={"dense"}
                variant={"outlined"}
                label={'Monthly Payment Type'}
            />
          </div>
          <div className={styles.flex1}>
            <TextField
                disabled={isDisabled ? true : false}
                error={errors?.amount}
                onChange={handleChange}
                value={data?.amount}
                fullWidth={true}
                name={"amount"}
                margin={"dense"}
                variant={"outlined"}
                label={'Monthly Payment Amount'}
                type={'number'}
            />
          </div>
        </div>
      </div>
      {
        !isDisabled && <div className={"textCenter"}>
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
      }
      
      <br />
    </div>
  );
};

export default IncludSalaryField;
