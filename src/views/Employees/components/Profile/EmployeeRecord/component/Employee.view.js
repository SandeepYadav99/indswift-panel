import React, { Component, useEffect, useMemo } from "react";
import {
  Button,
  MenuItem,
  withStyles,
  FormControlLabel,
  Switch,
  IconButton,
  ButtonBase,
} from "@material-ui/core";
import styles from "../Style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import history from "../../../../../../libs/history.utils";
import { makeStyles } from "@material-ui/core/styles";
import useEmployeeView from "./EmployeeViewHook.js";
import CustomSelectField from "../../../../../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../../../../components/FormFields/TextField/TextField.component";
import LogUtils from "../../../../../../libs/LogUtils";
import CustomDateTimePicker from "../../../../../../components/FormFields/DatePicker/CustomDateTimePicker";
import File from "../../../../../../components/FileComponent/FileComponent.component";

const useStyle = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const AnnualView = ({ selectedAnnuals, closeSidePanel, originWarehouseId }) => {
  const classes = useStyle();
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    onBlurHandler,
    removeError,
    warehouses,
    users,
    listData,
  } = useEmployeeView({ selectedAnnuals, closeSidePanel, originWarehouseId });

  const renderWarehouses = useMemo(() => {
    const menuItems = [];
    warehouses.forEach((warehouse) => {
      const isThere = selectedAnnuals.some(
        (val) => val.origin_warehouse_id === warehouse.id
      );
      if (!isThere) {
        menuItems.push(
          <MenuItem value={warehouse.id} key={warehouse.id}>
            {warehouse.title}
          </MenuItem>
        );
      }
    });
    return menuItems;
  }, [warehouses, selectedAnnuals]);

  return (
    <div>
      <div className={styles.headerFlex}>
        {/*<h4 className={styles.infoTitle}>*/}
        {/*    <div className={styles.heading}>Annual</div>*/}
        {/*    <Tooltip title="Info" aria-label="info" placement="right">*/}
        {/*        <InfoIcon fontSize={'small'}/>*/}
        {/*    </Tooltip>*/}
        {/*</h4>*/}
      </div>
      <div className={styles.upperInfo}>
        {/* <div>FY 2022-23</div>
        <div>On Roll Employee</div> */}
      </div>

      <div>
        {/* <div className={styles.loc}>Mohali Location</div>
        <div className={styles.hr}>Human Resources Department</div> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={"formFlex"}>
          <div className={"formGroup1"}>
            <CustomTextField
              isError={errorData?.approved_count}
              errorText={errorData?.approved_count}
              label={"Letter Title"}
              value={form?.approved_count}
              onTextChange={(text) => {
                changeTextData(text, "approved_count");
              }}
              onBlur={() => {
                onBlurHandler("approved_count");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup2"}>
            <CustomSelectField
              isError={errorData?.type_of_letter}
              errorText={errorData?.type_of_letter}
              label={"Type Of Letter"}
              value={form?.type_of_letter}
              handleChange={(value) => {
                changeTextData(value, "type_of_letter");
              }}
            >
              {listData?.TYPE_OF_LETTER?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.name}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
          <div className={"formGroup2"}>
            <CustomDatePicker
              clearable
              label={"Date Of issue"}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "date");
              }}
              value={form?.date}
              isError={errorData?.date}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup2"}>
            <File
              max_size={2 * 1024 * 1024}
              type={["pdf"]}
              fullWidth={true}
              name="document"
              accept={"application/pdf"}
              label=""
              default_image={form?.document ? form?.document : null}
              // user_image={form?.image}
              error={errorData?.document}
              // title={'image'}
              value={form?.document}
              // handleChange={this._handleFileChange}
              placeholder={"PDF Upload"}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "document");
                }
              }}
            />
          </div>
          <div className={"formGroup2"}>
            <CustomTextField
              isError={errorData?.letter_head}
              errorText={errorData?.letter_head}
              label={"Letter Head"}
              value={form?.letter_head}
              onTextChange={(text) => {
                changeTextData(text, "letter_head");
              }}
              onBlur={() => {
                onBlurHandler("letter_head");
              }}
            />
          </div>
        </div>

        <div className={styles.generate}>
          <ButtonBase
            type={"button"}
            onClick={handleSubmit}
            className={styles.createBtn}
          >
            Upload
          </ButtonBase>
        </div>
      </form>
    </div>
  );
};

export default AnnualView;
