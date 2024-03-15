import React from "react";
import {ButtonBase} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import {makeStyles} from "@material-ui/styles";
import CustomTextField from "../../../../../../components/FormFields/TextField/TextField.component";
import useDesDialogHook from "./DesDialog.hook";

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

const DesDialog = ({ isOpen, handleToggle,fetchData }) => {
  const classes = useStyles();
  const { changeTextData, errorData, form, handleSubmit, onBlurHandler } =
    useDesDialogHook({ isOpen, handleToggle ,fetchData});

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
      >
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Add Description</div>
            <div className={styles.newLine}></div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomTextField
                isError={errorData?.description}
                errorText={errorData?.description}
                label={"Description"}
                value={form?.description}
                onTextChange={(text) => {
                  changeTextData(text, "description");
                }}
                onBlur={() => {
                  onBlurHandler("description");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              Add
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DesDialog;
