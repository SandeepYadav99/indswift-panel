import React, {useCallback, useState} from 'react';
import {Button, ButtonBase, MenuItem} from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import useNoteDialogHook from "./UploadCsvDialog.hook";
import File from "../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../libs/LogUtils";

// const useStyles = makeStyles((theme) => ({
//     flex: {
//         display: "flex",
//         width: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'blue',
//         textDecoration: 'underline'
//     },
//     textField: {
//         width: '100%',
//     }
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UploadCsvDialog = ({isOpen, handleToggle, orderId}) => {
    const classes = {};///useStyles();
    const { changeTextData, errorData, form, handleSubmit, onBlurHandler, removeError, isSubmitting } = useNoteDialogHook({orderId, handleToggle});
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
                // classes={{paper: classes.dialog}}
            >
                {/*<DialogTitle id="alert-dialog-title">*/}
                <div className={styles.upperFlex}>Import Employee CSV</div>
                {/*</DialogTitle>*/}
                <DialogContent>
                    <File
                        max_size={100 * 1024 * 1024}
                        type={['csv']}
                        fullWidth={true}
                        name="image"
                        accept={'text/csv'}
                        label=""
                        default_image={form?.file ? form?.file : null}
                        // user_image={form?.image}
                        error={errorData?.file}
                        // title={'image'}
                        value={form?.file}
                        // handleChange={this._handleFileChange}
                        placeholder={'Csv File'}
                        onChange={(file) => {
                            LogUtils.log('file', file);
                            if (file) {
                                changeTextData(file, 'file');
                            }
                        }}
                    />
                </DialogContent>
                {/*<DialogActions>*/}
                    <div className={styles.printFlex}>
                        <ButtonBase primary disabled={isSubmitting} onClick={handleSubmit} className={styles.btmBtn}>
                            Upload Csv
                        </ButtonBase>
                    </div>
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
};

export default UploadCsvDialog;
