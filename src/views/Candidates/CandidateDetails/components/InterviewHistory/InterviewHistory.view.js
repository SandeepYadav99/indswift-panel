import React, {useCallback, useState} from "react";
import styles from "./Style.module.css";
import SummaryView from "./components/SummaryView/SummaryView";
import EventDetails from "./components/EventDetails/EventDetails";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import {Link} from "react-router-dom";
import {serviceSendCVShortlistReminder} from "../../../../../services/CVShortlist.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const InterviewHistory = ({historyDetail, historyData}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCVShortlistReminder = useCallback((candidateId, jobId) => {
        if (!isSubmitting) {
            setIsSubmitting(true);
            serviceSendCVShortlistReminder({candidate_id: candidateId, job_id: jobId}).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Reminder Sent');
                }
                setIsSubmitting(false);
            });
        }
    }, [setIsSubmitting, isSubmitting]);

    return (
        <div className={styles.historyWrapper}>
            {historyData?.map((item, index) => {
                return (
                    <div className={styles.interviewWrapper} key={`historyCard_${index}`}>
                        <div className={styles.titleWrapper}>
                            <div>
                                <div className={styles.title}>
                                    {" "}
                                    Summary -{" "}
                                    <Link
                                        to={`/job/openings/details/${item?.job_openings?.id}`}
                                        target="_blank"
                                        style={{color: "#2896e9"}}
                                    >
                                        <span>{item?.job_openings?.code}</span>
                                    </Link>
                                </div>
                                <div className={styles.newLine}/>
                            </div>
                            <div>
                                <StatusPill status={item?.job_openings?.status}/>
                            </div>
                        </div>
                        <SummaryView
                            isSubmittin={isSubmitting}
                            handleSendReminder={() => {
                                handleCVShortlistReminder(item.candidate_id, item.job_id);
                            }}
                            status={item?.cv_shortlist}
                            title="CV Shortlist"
                            statustitle="CV Final Status :"
                            cvList={item?.cv_shortlist_feedback}
                            date={item?.cv_shortlist_updated_on}
                        />
                        <SummaryView
                            status={item?.interview_status}
                            title="Interview Feedback"
                            statustitle="Interview Final Status:"
                            InterviewList={item?.interview_feedback}
                            rating={item?.rating}
                            date={item?.status_updated_on}
                        />
                        <SummaryView
                            status={item?.offer_letter_status}
                            title="Offer Letter"
                            statustitle="Offer Letter Final Status:"
                            offerList={item?.offer_letter_feedback}
                            date={item?.offer_letter_status_updated_on}
                        />
                    </div>
                );
            })}

            <EventDetails data={historyDetail}/>
        </div>
    );
}

export default InterviewHistory;
