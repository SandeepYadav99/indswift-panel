import React, { useCallback } from "react";
import CalendarMui from "./components/CalendarMui/CalendarMui";
import styles from "./Style.module.css";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CalendarDetail from "./components/FullCalendar/FullCalendar";
import PageBox from "../../../../components/PageBox/PageBox.component";

import useCalendarList from "./CalendarListHook";
import EventForm from "./components/EventForm/EventForm.view";
import { Add } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";

function CalendarList() {
  const {
    isSidePanel,
    handleSideToggle,
    checkedItems,
    handleCheckboxChange,
    filteredData,
    selectedDate,
    handleDateChange,
    editData,
    renderList,
  } = useCalendarList({});
  const checkboxLabel = {
    color: "#161616",
    fontSize: "14px",
    fontFamily: "Montserrat",
    fontWeight: "500",
  };
  const upperTitle =useCallback(()=>{
    return (
      <div>
      <div>{`${editData?.id ? "Edit " : "Add"} Holiday`}</div>
      <div className={styles.newLine}/>
      </div>
    )
  },[editData])
  return (
    <PageBox>
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <div className={styles.calContainer}>
            <ButtonBase
              type={"button"}
              onClick={() => handleSideToggle()}
              className={styles.createBtn}
            >
              ADD HOLIDAY
              <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
            <div className="calender_Wrapper">
              <CalendarMui
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
          <div className={styles.lowerWrap}>
            <div className={styles.title}>FILTER</div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#2896E9", borderColor: "#2896E9" }}
                    name="all"
                    checked={checkedItems?.all}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={checkboxLabel}>View All</span>}
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#66BA27", borderColor: "#66BA27" }}
                    name="GAZETTED"
                    checked={checkedItems?.GAZETTED}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={checkboxLabel}>Holiday</span>}
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#FF493F", borderColor: "#FF493F" }}
                    name="RESTRICTED"
                    checked={checkedItems?.RESTRICTED}
                    onChange={handleCheckboxChange}
                  />
                }
                label={<span style={checkboxLabel}>Restricted Holiday</span>}
              />
            </div>
            <div className={styles.discriptionWrap}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#7848CB", borderColor: "#7848CB" }}
                    name="OPTIONAL"
                    checked={checkedItems?.OPTIONAL}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <span style={checkboxLabel}>
                    Optional (only 1 can be taken)
                  </span>
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <CalendarDetail
            data={filteredData}
            selectedDate={selectedDate}
            handleSideToggle={handleSideToggle}
          />
        </div>
      </div>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={upperTitle()}
        open={isSidePanel}
        side={"right"}
      >
        <EventForm
          isOpen={isSidePanel}
          handleToggle={handleSideToggle}
          editData={editData}
          renderList={renderList}
        />
      </SidePanelComponent>
    </PageBox>
  );
}

export default CalendarList;
