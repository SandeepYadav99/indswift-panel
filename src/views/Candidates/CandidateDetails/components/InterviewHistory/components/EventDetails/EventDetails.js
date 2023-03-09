import React from "react";
import EventDetailCard from "../EventDetailCard/EventDetailCard";
import styles from "./Style.module.css";
function EventDetails({ data }) {
  return (
    <div className={styles.summaryWrapper}>
      <div>
        <div className={styles.title}> Event Details</div>
        <div className={styles.newLine} />
      </div>
      {data?.map((item, index) => (
        <EventDetailCard data={item} key={`eventCard_${index}`} />
      ))}
    </div>
  );
}

export default EventDetails;
