import React, {useCallback, useState} from 'react';
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import useHeadDeptDialogHook from "./HeadDeptDialog.hook";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'blue',
        textDecoration: 'underline'
    },
    textField: {
        width: '100%',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuickHeadDeptDialog = ({isOpen, handleToggle, employees, showDetails, departmentId, handleUpdate}) => {
    const classes = useStyles();
    const { changeTextData, errorData, form, handleSubmit, onBlurHandler, removeError, isSubmitting } = useHeadDeptDialogHook({handleUpdate, departmentId, employees, handleToggle,isOpen,showDetails});
    return (
        <div>
            <Dialog
                keepMounted
                fullWidth={true}
                maxWidth={'sm'}
                TransitionComponent={Transition}
                open={isOpen}
                onClose={handleToggle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                {/*<DialogTitle id="alert-dialog-title">*/}
                <div className={styles.upperFlex}>Add Location Head</div>
                {/*</DialogTitle>*/}
                <div className={styles.auto}>
                    <CustomAutoComplete
                        className={classes.textField}
                        autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.label}}
                        dataset={employees}
                        datasetKey={'label'}
                        onTextChange={(text, value) => {  changeTextData(text, 'name'); }}
                        variant={'outlined'}
                        label={'Employee Name (Employee ID)'}
                        name={'name'}
                        isError={errorData?.name}
                        value={form?.name}
                        // errorText={errorData?.name}
                    />

                </div>
                {/*<DialogActions>*/}
                    <div className={styles.printFlex}>
                        <ButtonBase
                            // disabled={isSubmitting}
                            onClick={handleSubmit} className={styles.btmBtn}>
                            ADD HEAD
                        </ButtonBase>
                    </div>
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
};

export default QuickHeadDeptDialog;
