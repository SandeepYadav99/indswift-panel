import React from "react";
import styles from "./Style.module.css";
import image from "../../../../../assets/img/download.png";
import StatusPill from "../../../../../components/Status/StatusPill.component";

function FinalUpperCard({ data, otherData }) {
  return (
    <div className={styles.newContainer}>
      <div className={styles.editFlex}>
        <div className={styles.heading}>Employee Information</div>
      </div>

      <div className={styles.mainFlex}>
        <div className={styles.left221}>
          <div>
            <img
              className={styles.claimimg}
              src={data?.image ? data?.image : image}
            />
          </div>
          <div>
            <div className={styles.key}>
              <span className={styles.value}>Name:</span>
              {data?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ID:</span>
              {data?.emp_code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Location:</span>
              {data?.location?.name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>F&F Case Number:</span>{otherData?.code}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>DOB:</span>
              {data?.dob}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Service Years with Org (round):
              </span>
              {data?.experience?.current}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Date of Resignation:</span>
              {data?.resign_data?.resign_effective_date}
            </div>
            {otherData?.id && (
              <>
                <div className={styles.key}>
                  <span className={styles.value}>
                    Permitted Leaves on Notice:
                  </span>
                  {otherData?.notice_leave_permitted}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Applicable Shortfall:</span>
                  {otherData?.shortfall_applicable}
                </div>{" "}
                <div className={styles.key}>
                  <span className={styles.value}>Actual DOL:</span>
                  {otherData?.dolText}
                </div>{" "}
                <div className={styles.key}>
                  <span className={styles.value}>Served For:</span>
                  {otherData?.served_for}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>Remarks about shortfall:</span>
                  {otherData?.shortfall_remarks}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.vertical}></div>
        <div className={styles.left}>
          <div className={styles.key}>
            <span className={styles.value}>Parting Designation:</span>
            {data?.designation?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Grade/Cadre:</span>
            {`${data?.grade?.code} / ${data?.cadre?.code}`}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>Department:</span>
            {data?.department?.name}
          </div>
          <div className={styles.key}>
            <span className={styles.value}>DOJ:</span>
            {data?.dojText}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Age on Separation Date:</span>
            {data?.age}
          </div>{" "}
          <div className={styles.key}>
            <span className={styles.value}>Separation By Virtue of:</span>
            <StatusPill status={data?.status} />
          </div>{" "}
          {otherData?.id && (
            <>
              <div className={styles.key}>
                <span className={styles.value}>
                  Shortfall of Notice Period:
                </span>
                {otherData?.shortfall_notice_period}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Leaves to be added in Shortfall:
                </span>
                {otherData?.shortfall_notice_period}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>
                  Planned Date of Separation:
                </span>
                {otherData?.pdsText}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Notice Period in Days:</span>
                {otherData?.notice_period}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>
                  Leaves Availed on Notice/LOP:
                </span>
                {otherData?.notice_leave_availed}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalUpperCard;
