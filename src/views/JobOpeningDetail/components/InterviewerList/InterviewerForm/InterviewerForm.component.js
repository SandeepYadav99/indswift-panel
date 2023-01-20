import React from 'react';
import IncludeForm from "./Includes.component";
import styles from './style.module.css';
import useInterviewerForm from "./InterviewerFormHook";
import {ButtonBase, makeStyles} from "@material-ui/core";
import MuiStyle from "../../../../../libs/MuiStyle";

const useStyle = makeStyles(MuiStyle);

const InterviewerFormComponent = ({jobId, handleSubmit}) => {
    const { interviewerFormRef, handleUpdate } = useInterviewerForm({jobId, handleSubmit});
    const classes = useStyle();
    return (
        <div className={styles.mainContainer}>
            <div style={{flex: 1}}>
        <IncludeForm ref={interviewerFormRef}/>
            </div>
            <ButtonBase onClick={handleUpdate} className={classes.createBtn}>
                Update
            </ButtonBase>
        </div>
    );
};

export default InterviewerFormComponent;
