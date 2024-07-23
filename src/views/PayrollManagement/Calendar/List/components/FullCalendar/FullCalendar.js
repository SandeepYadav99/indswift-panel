import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { ButtonBase, Typography, Button, ButtonGroup } from "@material-ui/core";
import styles from "./Style.module.css";
import {
  getBgColor,
  getTextColor,
} from "../../../../../../helper/calenderData";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarUtils from "../../../../../../libs/SnackbarUtils";

const localizer = momentLocalizer(moment);
const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    border: "#1285F9",
    borderRadius: "4px",
    overflow: "hidden",
  },
  button: {
    color: "#2896E9",
    borderColor: "#2896E9",
  },
}));
const LISTMESSAGE = { time: "Slot", event: "Holiday" };
const CalendarDetail = ({ data, selectedDate, handleSideToggle }) => {
  const classes = useStyles();
  const [events, setEvents] = useState([...data]);
  const [activeMonth, setActiveMonth] = useState("month");

  useEffect(() => {
    if (data) {
      const updated = data?.map((item) => {
        return {
          ...item,
          title: item?.name,
          start: new Date(item?.start_date),
          end: new Date(item?.end_date),
        };
      });
      setEvents(updated);
    }
  }, [data]);

  const handleEventRemove = (eventToRemove) => {
    if (eventToRemove) {
      handleSideToggle(eventToRemove);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = getBgColor(event?.holiday_type); // Default color
    let textColor = getTextColor(event?.holiday_type);
    return {
      style: {
        backgroundColor: activeMonth !== "agenda" && backgroundColor,
        color: activeMonth !== "agenda" && textColor,
      },
    };
  };

  const activeClass = {
    background: "#ECF7FF 0% 0% no-repeat padding-box",
  };
  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div
        className={
          activeMonth === "week" ? styles.toolWrapperWeek : styles.toolWrapper
        }
      >
        <div className={styles.upperWrap}>
          <ButtonBase onClick={() => onNavigate("PREV")}>
            <ArrowBackIosIcon fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <ButtonBase onClick={() => onNavigate("NEXT")}>
            <ArrowForwardIosIcon
              fontSize={"small"}
              className={styles.backIcon}
            />
          </ButtonBase>
          <span className={styles.label}>{label}</span>
        </div>
        <div>
          <ButtonGroup
            className={classes.buttonGroup}
            variant="outlined"
            size="large"
            aria-label="Medium-sized button group"
          >
            <Button
              className={classes.button}
              onClick={() => onView("month")}
              style={activeMonth === "month" ? activeClass : {}}
            >
              <Typography className={styles.fontSize}>MONTH</Typography>
            </Button>
            <Button
              className={classes.button}
              onClick={() => onView("week")}
              style={activeMonth === "week" ? activeClass : {}}
            >
              <Typography className={styles.fontSize}>WEEK</Typography>
            </Button>
            {/* <Button
            className={classes.button}
              onClick={() => onView("day")}
              style={activeMonth === "day" ? activeClass : {}}
            >
              <Typography variant="body1">DAY</Typography>
            </Button> */}
            <Button
              className={classes.button}
              onClick={() => onView("agenda")}
              style={activeMonth === "agenda" ? activeClass : {}}
            >
              <Typography className={styles.fontSize}>LIST</Typography>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };
  const CustomAgendaEvent = ({ event }) => {
 
    return (
      <div className={styles.agendaContainer}>
        <div
          style={{
            backgroundColor: getTextColor(event?.holiday_type),
            height: "12px",
            width: "12px",
            borderRadius: "12px",
            borderLeft: "none",
          }}
        />
        <div>{event?.title}</div>
      </div>
    );
  };
  const CustomAgendaTime = ({ event }) => {
  
    return (
      <div className={styles.typeText}>{event?.type?.replaceAll("_", " ")}</div>
    );
  };
  const CustomAgendaDate = ({ date }) => {
    return <div>{"Hi"} </div>;
  };

  const handleSlotSelect = (slotInfo) => {
    console.log(slotInfo);
    const hasExistingEvent = events?.some((event) =>
      moment(event?.start)?.isSame(slotInfo?.start, "day")
    );
    const values = {
      start_date: slotInfo?.start,
      end_date: slotInfo?.end,
    };
    if (hasExistingEvent) {
      SnackbarUtils.error("An holiday already exists for this day.");
    } else {
      handleSideToggle(values);
    }
  };

  return (
    <div className={styles.detailWrap}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventRemove}
        eventPropGetter={eventStyleGetter}
        popup
        resizable
        defaultView={Views.MONTH}
        style={{
          padding: "10px",
          marginLeft: activeMonth === "week" && "-10px",
        }}
        components={{
          toolbar: CustomToolbar,
          agenda: {
            event: CustomAgendaEvent,
            time: CustomAgendaTime,
            // date: CustomAgendaDate,
          },
        }}
        onView={(view) => setActiveMonth(view)}
        date={selectedDate?.$d && selectedDate?.$d}
        drilldownView={null}
        messages={LISTMESSAGE}
       
      />
    </div>
  );
};

export default CalendarDetail;
