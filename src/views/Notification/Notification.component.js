import React, { useState,useEffect} from "react";
import styles from "./Notification.module.css";
import {
    ButtonBase,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../libs/history.utils";
import { serviceGetNotifications } from "../../services/Notification.services";

const Notification = () => {
    const [notifications,setNotifications] = useState([]);

    useEffect(()=>{
        const response = serviceGetNotifications();
        setNotifications(response?.data)
    },[notifications?.length])


    return (
        <div className={styles.container}>
            <div>
                <ButtonBase onClick={() => history.goBack()}>
                    <ArrowBackIosIcon fontSize={"small"} />{" "}
                    <span className={"capitalize"}>
                        <b>Notification</b>
                    </span>
                </ButtonBase>
                <div className={styles.newLine} />
            </div>
            <br />

            <div className={styles.downFlex}>
                <div className={styles.cardData}>
                    <div className={styles.titleData}>Notification 3</div>
                    <div className={styles.descriptionData}>Dear Delegate,<br /> We're about to welcome Mr. Rishabh Rathore to the stage. Please take your seats as doors will be locked after 10 mins.</div>

                </div>
                <div className={styles.cardDataTwo}>
                    <div className={styles.titleData}>Notification 2</div>
                    <div className={styles.descriptionData}>Dear Delegate,<br /> The session for the Power in Stock Market is starting. Request you to please take your seats in the Conference Area.</div>

                </div>
                <div className={styles.cardDataTwo}>
                    <div className={styles.titleData}>Notification 1</div>
                    <div className={styles.descriptionData}>Good Morning Delegates <br />The show is about to begin, requesting everyone to take the seats in the Conference Area post having Breakfast</div>

                </div>
            </div>

        </div>
    );
};

export default Notification;
