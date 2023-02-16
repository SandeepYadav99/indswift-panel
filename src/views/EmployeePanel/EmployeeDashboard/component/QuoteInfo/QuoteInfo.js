import React from "react";
import { useEffect } from "react";
import { postRequest } from "../../../../../libs/AxiosService.util";
import styles from "./Style.module.css";
import axios from "axios";
import { useState } from "react";

function QuoteInfo() {
  const [quoteData, setQuoteData] = useState({});
  useEffect(() => {
    let dataValues = axios.get("https://api.quotable.io/random?maxLength=100");
    dataValues
      .then((data) => {
        setQuoteData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const dayOfMonth = today.getDate();
  const monthOfYear = monthsOfYear[today.getMonth()];
  const year = today.getFullYear();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthOfYear}, ${year}`;
  // console.log(formattedDate);
  return (
    <div className={styles.userInfoWrapper}>
      {quoteData && (
        <div className={styles.UserinfoRight}>
          <div className={styles.dateWrapper}>
            <p className={styles.quoteDate}>{formattedDate}</p>
          </div>
          <div className={styles.UserinfoContactWrapper}>
            <p className={styles.contactUpper}>{quoteData?.content}</p>
            <p className={styles.contactLower}>{quoteData?.author}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuoteInfo;
