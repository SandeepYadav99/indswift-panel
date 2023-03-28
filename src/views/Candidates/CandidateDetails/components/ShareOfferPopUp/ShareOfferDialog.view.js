import React from "react";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import useShareOfferDialogHook from "./ShareOfferDialog.hook";
import PdfViewer from "../OfferPdfView/OfferPdfView";

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

const ShareOfferDialog = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  const {} = useShareOfferDialogHook({ isOpen, handleToggle, candidateId });
  return (
    <div>
      <Dialog
      fullScreen={true}
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
        <PdfViewer handleToggle={handleToggle}>

        </PdfViewer>
      </Dialog>
    </div>
  );
};

export default ShareOfferDialog;
