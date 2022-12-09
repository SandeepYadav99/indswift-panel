import React, {useCallback, useState} from 'react';
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import styles from "./Style.module.css";
import useHeadDialogHook from "./HeadDialog.hook";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

const vendorDataSet = [{_id: "63216f263a3fb17e4e510c5b", name: "Test(1221)", id: "1221"}]

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

const QuickHeadDialog = ({isOpen, handleToggle, orderId,showDetails}) => {
    const classes = useStyles();
    const { changeTextData, errorData, form, handleSubmit, onBlurHandler, removeError, isSubmitting } = useHeadDialogHook({orderId, handleToggle,isOpen,showDetails});
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
                        autoCompleteProps={{ freeSolo: false, getOptionLabel: (option) => option.name}}
                        dataset={vendorDataSet}
                        datasetKey={'name'}
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

export default QuickHeadDialog;
