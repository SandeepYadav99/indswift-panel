import React, { useState } from "react";

import {
  DatePicker,

  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import styles from "./Style.module.css";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiTypography-colorInherit": {
      font: "normal normal normal 14px Montserrat !important",
      color: "#161616",
    },
    "& .MuiPickersDay-daySelected": {
      backgroundColor: "#ECF7FF",
      color: "#2896E9 !important",
    },
    "& .MuiPickersCalendarHeader-dayLabel": {
      font: "normal normal 600 14px/20px Montserrat",
     
      color: "#161616",
    },
    "& .MuiTypography-alignCenter":{
      font: "normal normal 600 14px Montserrat !important",
      color: "#161616",
     
    }
   
  },
});

function CalendarMui({ selectedDate, handleDateChange }) {
  const classes = useStyles();
  return (
    <div className={styles.calWrapper}>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        className={styles.calContainer}
      >
        <div className={classes.root}>
          <DatePicker
            variant="static"
            disabled={true}
            open={true}
             
            value={selectedDate}
            disableToolbar={true}
            onChange={handleDateChange}
            format={"dd-MM-yyyy"}
           
          />
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default CalendarMui;
