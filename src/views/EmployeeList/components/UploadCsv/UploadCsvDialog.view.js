import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import useNoteDialogHook from "./UploadCsvDialog.hook";
import File from "../../../../components/FileComponent/FileComponent.component";
import LogUtils from "../../../../libs/LogUtils";
import { makeStyles } from "@material-ui/styles";
import useUploadCsvDialogHook from "./UploadCsvDialog.hook";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadCsvDialog = ({ isOpen, handleToggle, handleCsvUpload }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    isVerified,
  } = useUploadCsvDialogHook({ isOpen, handleCsvUpload, handleToggle });

  const renderTable = useMemo(() => {
    if (resData.length === 0) return "Success";
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell align="right">Required Data</TableCell>
              <TableCell align="right">Lookup Fail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row?.sr_no}
                </TableCell>
                <TableCell align="right">{row?.required?.join(", ")}</TableCell>
                <TableCell align="right">
                  {row?.lookup_err?.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [resData]);


  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // classes={{paper: classes.dialog}}
      >
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={"flex"}>
          <div className={styles.upperFlex}>Import Employee CSV</div>
          <ButtonBase
            classes={{ root: classes.closeBtn }}
            onClick={handleToggle}
          >
            <Close />
          </ButtonBase>
        </div>
        {/*</DialogTitle>*/}
        <DialogContent>
          <File
            clearable
            max_size={100 * 1024 * 1024}
            type={["csv"]}
            fullWidth={true}
            name="image"
            accept={"text/csv"}
            label=""
            default_image={form?.file ? form?.file : null}
            // user_image={form?.image}
            error={errorData?.file}
            // title={'image'}
            value={form?.file}
            // handleChange={this._handleFileChange}
            placeholder={"Csv File"}
            onChange={(file) => {
              LogUtils.log("file", file);
              if (file) {
                changeTextData(file, "file");
              }
            }}
          />
        </DialogContent>
        {!isVerified && (
          <div className={styles.printFlex}>
            <ButtonBase
              primary
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={styles.btmBtn}
            >
               Verify Csv
            </ButtonBase>
          </div>
        )}

        {isVerified && (
          <div className={styles.printFlex}>
            <ButtonBase
              primary
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={styles.btmBtn}
            >
              Upload Csv
            </ButtonBase>
          </div>
        )}

        {/*</DialogActions>*/}
        <div className={styles.tableCont}>{isSubmitted ? renderTable : ""}</div>
      </Dialog>
    </div>
  );
};

export default UploadCsvDialog;
