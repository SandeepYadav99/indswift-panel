import React, { useEffect, useMemo } from "react";
import styles from "./style.module.css";
import CustomAutoComplete from "../../../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import { useCallback } from "react";
import { ButtonBase } from "@material-ui/core";

const CoIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  filteredList
}) => {
  const handleChangeValue = useCallback(
    (value, key) => {
      changeData(index, { [key]: value });
    },
    [changeData, index]
  );
  return (
    <div className={styles.formWrp}>
        <div className={styles.formGrp}>
          <CustomAutoComplete
            autoCompleteProps={{
              freeSolo: false,
              getOptionLabel: (option) => option.label,
            }}
            dataset={filteredList}
            datasetKey={"label"}
            onTextChange={(text, value) => {
              handleChangeValue(text, "co_passengers");
            }}
            variant={"outlined"}
            label={"Employee Name(Employee ID)"}
            name={"co_passengers"}
            isError={errors?.co_passengers}
            value={data?.co_passengers}
          />
      </div>
      <div className={styles.btnWrap}>
            <ButtonBase
              className={styles.removeBtn}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
    </div>
  );
};

export default CoIncludeFields;
