import React, { useMemo } from 'react';
import useIncrementMasterHook from "./IncrementMasterHook";
import { Button, ButtonBase, MenuItem, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import { Autocomplete } from "@material-ui/lab";
import ChildrenIncludeForm from "./includes/ChildrenIncludes.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

import classNames from "classnames";
import CustomAutoComplete from "../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import WaitingComponent from "../../../components/Waiting.component";

const useStyles = makeStyles((theme) => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
}));


const IncrementMasterCreateView = ({ }) => {
    const { form, errorData, isSubmitting, isLoading,  fyYear,
        setFyYear, batch,
        setBatch,
        initialApiCall,
         handleSubmit, removeError, onBlurHandler, changeTextData, isEdit, handleDelete, handleReset, id, listData,slabOneRef,slabTwoRef } = useIncrementMasterHook({});
    const classes = useStyles();
    const renderStartDate = useMemo(() => {
        return (
          <CustomSelectField
            label={"Financial Year"}
            value={fyYear}
            handleChange={(value) => {
              setFyYear(value);
              //   sessionStorage.setItem("fyYear", value);
            }}
          >
            <MenuItem value={"2023"}>2023</MenuItem>
          </CustomSelectField>
        );
      }, [fyYear]);

      const renderEndDate = useMemo(() => {
        return (
          <CustomSelectField
            label={"Batch"}
            value={batch}
            handleChange={(value) => {
              setBatch(value);
              //   sessionStorage.setItem("end", value);
            }}
          >
            <MenuItem value={"APMS"}>APMS</MenuItem>
            <MenuItem value={"DTY"}>DTY</MenuItem>
          </CustomSelectField>
        );
      }, [batch]);
    // if (isLoading) {
    //     return <WaitingComponent />
    // }

    return (
        <div>
            <div className={styles.outerFlex}>
                <div>
                    <ButtonBase >
                        <span><b>Increment Master</b></span>
                    </ButtonBase>
                    <div className={styles.newLines} />
                </div>
            </div>


            <div className={'plainPaper'}>
                {/* <div className={'headerFlex'}>
                    <h4 className={'infoTitle'}>
                        <div className={'heading'}>Department Details</div>
                        {/*<Tooltip title="Info" aria-label="info" placement="right">*/}
                {/*    <InfoIcon fontSize={'small'}/>*/}
                {/*</Tooltip>
                    </h4>
                </div> */}
                 <div className={styles.yearFlex}>
              <div className={styles.down}>{renderStartDate}</div>
              <div className={styles.down}>{renderEndDate}</div>
              {/* <div className={styles.rightFlex}>
                <ButtonBase
                  aria-haspopup="true"
                  onClick={() => initialApiCall()}
                  className={"createBtn"}
                >
                  Update
                </ButtonBase> */}
              {/* </div> */}
            </div>
                <div className={'formFlex'}>
                    <div className={"formGroup"}>
                        <span style={{ font: 'normal normal bold 14px/18px Montserrat' }}>Slab 1: Grades</span>
                    </div>
                    <div className={"formGroup"}>
                        <span style={{ font: 'normal normal bold 14px/18px Montserrat' }}>Slab 2: Grades</span>
                    </div>
                </div>
                <div className={'formFlex'}>
                    <div className={"formGroup"}>
                        {/* <span style={{ font: 'normal normal bold 14px/18px Montserrat' }}>Slab 1: Grades</span> */}
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            onChange={(e, value) => {
                                changeTextData(value, "grade_ids_one");
                            }}
                            // id="tags-standard"
                            options={listData?.GRADES || []}
                            getOptionLabel={(option) => option?.code}
                            getOptionDisabled={(option) => !!form?.grade_ids_two.find(element => element?.id === option?.id)}
                            value={form?.grade_ids_one}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={errorData?.grade_ids_one}
                                    variant="outlined"
                                    label="Select Grades"
                                />
                            )}
                        />
                    </div>
                    <div className={"formGroup"}>
                        {/* <span style={{ font: 'normal normal bold 14px/18px Montserrat' }}>Slab 2: Grades</span> */}
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            onChange={(e, value) => {
                                changeTextData(value, "grade_ids_two");
                            }}
                            // id="tags-standard"
                            options={listData?.GRADES || []}
                            getOptionLabel={(option) => option?.code}
                            getOptionDisabled={(option) => !!form?.grade_ids_one.find(element => element?.id === option?.id)}
                            value={form?.grade_ids_two}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={errorData?.grade_ids_two}
                                    // helperText={errorText}
                                    variant="outlined"
                                    label="Select Grades"
                                />
                            )}
                        />
                    </div>
                </div>
                {/* <div>
                    <div></div>
                    <div></div>
                    </div>
                                   */}

                <div className={'formFlex'}>
                    <div className={classNames(styles.topHeadingContainer, "formGroup")}>
                        <span>LEVEL</span>
                        <span>MIN</span>
                        <span>MAX</span>
                        <span>%</span>

                    </div>
                    <div className={classNames(styles.topHeadingContainer, "formGroup")}>
                        <span>LEVEL</span>
                        <span>MIN</span>
                        <span>MAX</span>
                        <span>%</span>

                    </div>

                </div>
                <div className={'formFlex'}>
                    <div className={"formGroup"}>
                    <ChildrenIncludeForm ref={slabOneRef} />
                    </div>
                    <div className={"formGroup"}>
                    <ChildrenIncludeForm ref={slabTwoRef} />

                    </div>

                </div>
                <div className={'formFlex'} style={{ flexDirection: 'column' }}>
                    <span style={{ font: 'normal normal bold 14px/20px Montserrat' }}>
                        NOTE: IF A USER DOES NOT QUALIFY IN RANGE, FIRST RANGE INCREMENT WILL BE APPLIED.
                    </span>
                    <span style={{ font: 'normal normal normal 14px/20px Montserrat' }}> Slab 1 will be applied on grade if a grade is not mapped.</span>
                </div>
                <div className={styles.btnCont}>
                    <ButtonBase disabled={isSubmitting} type={'button'} onClick={handleSubmit}
                        className={styles.createBtn}>
                        Save
                    </ButtonBase>
                </div>
            </div>

            {/* <div className={'plainPaper'}>

                <div className={styles.btnCont}>
                    <ButtonBase disabled={isSubmitting} type={'button'} onClick={handleSubmit}
                        className={styles.createBtn}>
                        Create
                    </ButtonBase>
                </div>
            </div> */}
        </div>
    )
};



export default IncrementMasterCreateView;
