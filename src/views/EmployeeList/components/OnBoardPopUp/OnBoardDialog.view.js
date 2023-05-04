import React from "react";
import {
  Button,
  ButtonBase,
  MenuItem,
} from "@material-ui/core";
import { Close, } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import useOnBoardDialogHook from "./OnBoardDialog.hook";
import CustomAutoComplete from "../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";

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

const OnBoardDialog = ({ isOpen, handleToggle, candidateId ,listData }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    isSubmitting,
  } = useOnBoardDialogHook({ isOpen, handleToggle, candidateId ,listData });
  return (
    <div>
      <Dialog
        // sx={{ width: "80%", height: "1000px" }}
        maxHeight="lg"
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
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <div className={styles.upperFlex}>Candidate Details</div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div>
            <CustomAutoComplete
                  autoCompleteProps={{
                    freeSolo: false,
                    getOptionLabel: (option) => option?.label,
                  }}
                  dataset={listData?.JOINING_CANDIDATES}
                  datasetKey={"label"}
                  onTextChange={(text ) => {
                    changeTextData(text, "emp_id");
                  }}
                  variant={"outlined"}
                  label={"Employee Name(Employee ID)"}
                  name={"emp_id"}
                  isError={errorData?.emp_id}
                  value={form?.emp_id}
                />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              Proceed
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default OnBoardDialog;
