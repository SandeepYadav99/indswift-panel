import React, { useMemo } from 'react';
import useIncrementMasterHook from "./IncrementMasterHook";
import { Button, ButtonBase, MenuItem, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import history from "../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../components/FormFields/CustomSwitch";
import { Autocomplete } from "@material-ui/lab";
import ChildrenIncludeForm from "./includes/ChildrenIncludes.component";

import classNames from "classnames";

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
    const { form, errorData, isSubmitting, isLoading,
         handleSubmit, removeError, onBlurHandler, changeTextData, isEdit, handleDelete, handleReset, id, listData,slabOneRef,slabTwoRef } = useIncrementMasterHook({});
    const classes = useStyles();
    console.log('ijdwodeod', listData?.GRADES)
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
                            getOptionDisabled={(option) => !!form?.grade_ids_two.find(element => element === option)}

                            // defaultValue={form?.submitted_by}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
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
                            getOptionDisabled={(option) => !!form?.grade_ids_one.find(element => element === option)}

                            // defaultValue={form?.submitted_by}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
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

                        {/* <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L1</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L2</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L3</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L4</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L5</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L6</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L7</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L8</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L9</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L10</span>
                            <div className={'formGroup'} style={{ marginLeft: 88 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L11</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div> */}
                    </div>
                    <div className={"formGroup"}>
                    <ChildrenIncludeForm ref={slabTwoRef} />

                        {/* <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L1</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L2</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L3</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L4</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L5</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L6</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L7</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L8</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L9</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L10</span>
                            <div className={'formGroup'} style={{ marginLeft: 88 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div>
                        <div className={'formFlex'}>
                            <span className={styles.levelHeading}>L11</span>
                            <div className={'formGroup'} style={{ marginLeft: 94 }}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Min"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"Max"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className={'formGroup'}>
                                <CustomTextField
                                    // disabled={true}

                                    // label={"%"}
                                    // value={claimAmount}

                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>

                        </div> */}
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
                        Create
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
