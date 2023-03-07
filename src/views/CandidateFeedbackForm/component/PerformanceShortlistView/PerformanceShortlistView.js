import React, { useState } from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import images from "../PerformanceView/PerformanceImages";

import { useEffect } from "react";
function PerformanceShortlistView({ title, question, handleChange, type }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [note, setNote] = useState("");

  useEffect(() => {
    handleChange && handleChange(type, { value: activeIndex, note: note });
  }, [activeIndex, note]);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <div className={styles.PerformanceViewWrapper}>
      <div className={styles.titleWrapper}>
        <span>{title}</span>
      </div>
      <div className={styles.questionWrapper}>
        <span>{question}</span>
      </div>
      <div className={styles.emojWrapper}>
        <div className={styles.emojCard} onClick={(e) => handleClick(1)}>
          <img
            src={
              activeIndex == 1
                ? images?.unsatisfactortory.active
                : images?.unsatisfactortory.inactive
            }
          />
          <span className={styles.performanceindex}>Rejected</span>
        </div>

        {/*<div className={styles.emojCard} id="3" onClick={(e) => handleClick(2)}>*/}
        {/*  <img*/}
        {/*    src={*/}
        {/*      activeIndex == 2*/}
        {/*        ? images?.average.active*/}
        {/*        : images?.average.inactive*/}
        {/*    }*/}
        {/*  />*/}
        {/*  <span className={styles.performanceindex}>Shortlisted</span>*/}
        {/*</div>*/}

        <div className={styles.emojCard} onClick={(e) => handleClick(2)}>
          <img
            src={
              activeIndex == 2
                ? images?.exceptional.active
                : images?.exceptional.inactive
            }
          />
          <span className={styles.performanceindex}>Selected</span>
        </div>
      </div>
      <div>
        <CustomTextField
          // isError={errorData?.note}
          // errorText={errorData?.note}
          label={"Please write related Comments"}
          value={note}
          onTextChange={(text) => {
            setNote(text);
          }}
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

export default PerformanceShortlistView;
