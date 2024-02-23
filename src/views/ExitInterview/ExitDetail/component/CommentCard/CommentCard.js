import React from "react";
import styles from "./Style.module.css";
import face from "./../../../../../assets/img/download.png";
import { removeUnderScore } from "../../../../../helper/helper";

const CommentCard = ({ data }) => {
  return (
    <div className={styles.candidateInfoWrapper}>
      <div className={styles.containerTop}>
        <div className={styles.headingWrapper}>
          <span>Official Comments on Exit Interview</span>
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.imageAlignCenter}>
            <img
              className={styles.candidateImg}
              src={data?.hrCommentBy?.image ? data?.hrCommentBy?.image : face}
            />
          </div>
          <div className={styles.thirdContainer}>
            <div className={styles.leftField}>
              <div className={styles.imageDesWrapper}>
                <div className={styles.desWrapper}>
                  <div className={styles.key}>
                    <span className={styles.value}>Name:</span>
                    {data?.hrCommentBy?.name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Designation:</span>
                    {data?.hrCommentBy?.designation?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightField}>
              <div className={styles.desWrapper}>
                <div className={styles.key}>
                  <span className={styles.value}>Department:</span>
                  {data?.hrCommentBy?.department?.name}
                </div>{" "}
                <div className={styles.key}>
                  <span className={styles.value}>Comments Added On:</span>
                  {data?.hrCommentDateText}
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.lowerWrap}>
        <div className={styles.quest}>1. Reason of Leaving</div>
        <div className={styles.des}>{data?.hr_comment}</div>
        <div className={styles.quest}>2. Behaviour while Exit</div>
        <div className={styles.des}>
          {removeUnderScore(data?.exit_type)}
        </div>{" "}
        <div className={styles.quest}>3. Disclosed new company?</div>
        <div className={styles.des}>
          {data?.is_new_company_disclosed ? "Yes" : "No"}
        </div>
        {data?.is_new_company_disclosed && (
          <div className={styles.des}>{data?.new_company_name}</div>
        )}
        <div className={styles.quest}>4. HR Comments on Exit</div>
        <div className={styles.des}>{data?.hr_comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
