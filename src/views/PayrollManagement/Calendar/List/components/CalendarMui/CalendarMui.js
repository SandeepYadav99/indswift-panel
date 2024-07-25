import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styles from "./Style.module.css";

function CalendarMui({ selectedDate, handleDateChange }) {
 
  return (
    <div className={styles.calWrapper}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        className={styles.calContainer}
      >
        <div>
          <DateCalendar
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            className="custom-date-calendar"
            value={selectedDate}
            // sx={{
            //   "& .MuiPickersDay-root": {
            //     fontFamily: "Montserrat",
            //     color: "#161616",
            //   },
            //   "& .MuiDayCalendar-weekDayLabel": {
            //     fontFamily: "Montserrat",
            //     color: "#161616",
            //     fontWeight: "500",
            //   },
             
              
            // }}
            onChange={handleDateChange}
            format={"dd-MM-yyyy"}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default CalendarMui;
