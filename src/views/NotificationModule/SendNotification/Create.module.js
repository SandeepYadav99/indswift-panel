import React, { useState } from "react";
import styles from "./Style.module.css";
import {
    Paper,
    ButtonBase,
    MenuItem,
    CircularProgress,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../libs/history.utils";
import useCreate from "./Create.hook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

const NotificationCreate = () => {

    const { handleSubmit,
        form,
        onBlurHandler,
        changeTextData,
        errorData
    } = useCreate({})


    return (
        <div className={styles.container}>
            <div>
                <ButtonBase onClick={() => history.goBack()}>
                    <ArrowBackIosIcon fontSize={"small"} />{" "}
                    <span className={"capitalize"}>
                        <b>Send Notification</b>
                    </span>
                </ButtonBase>
                <div className={styles.newLine} />
            </div>
            <br />
            <div className={styles.plainPaper}>
                <div className={styles.heading}>Notification Details</div>
                <div className={styles.leaveForm}>
                    <CustomTextField
                        isError={errorData?.title}
                        errorText={errorData?.title}
                        label={"Title"}
                        value={form?.title}
                        onTextChange={(text) => {
                            changeTextData(text, "title");
                        }}
                        onBlur={() => {
                            onBlurHandler("title");
                        }}
                    />
                    <CustomTextField
                        isError={errorData?.message}
                        errorText={errorData?.message}
                        label={"Message"}
                        value={form?.message}
                        onTextChange={(text) => {
                            changeTextData(text, "message");
                        }}
                        onBlur={() => {
                            onBlurHandler("message");
                        }}
                        multiline
                        rows={"3"}
                    />
                    <div style={{marginTop:"10px"}}>
                        <span className={styles.radioTitle}>Send to</span>
                        <div>
                        <FormControl className={styles.btnRadio}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                aria-label="option"
                                row
                                name="send_to"
                                value={form?.send_to}
                                onChange={(e) => changeTextData(e.target.value, "send_to")}
                                className={styles.heading}
                            >
                                <FormControlLabel
                                    value="ALL"
                                    control={<Radio />}
                                    label="All"
                                />
                                <FormControlLabel
                                    value="LOCATION"
                                    control={<Radio />}
                                    label="Location"
                                />
                                <FormControlLabel
                                    value="GRADE"
                                    control={<Radio />}
                                    label="Grade"
                                />
                                <FormControlLabel
                                    value="DESIGNATION"
                                    control={<Radio />}
                                    label="designation"
                                />
                                <FormControlLabel
                                    value="DEPARTMENT"
                                    control={<Radio />}
                                    label="Department"
                                />
                            </RadioGroup>
                        </FormControl>
                        </div> 
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <span className={styles.radioTitle}>Send to</span>
                        <div>
                        <FormControl className={styles.btnRadio}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                aria-label="option"
                                row
                                className={styles.heading}
                                name="send_priority"
                                value={form?.send_priority}
                                onChange={(e) => changeTextData(e.target.value, "send_priority")}
                            >
                                <FormControlLabel
                                    value="NOW"
                                    control={<Radio />}
                                    label="Send Now"
                                />
                                <FormControlLabel
                                    value="LATTER"
                                    control={<Radio />}
                                    label="Send Later"
                                />
                            </RadioGroup>
                        </FormControl>
                        </div> 
                    </div>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <ButtonBase
                    className={"createBtn"}
                    onClick={handleSubmit}
                >
                    SEND
                </ButtonBase>
            </div>
        </div>
    );
};

export default NotificationCreate;
