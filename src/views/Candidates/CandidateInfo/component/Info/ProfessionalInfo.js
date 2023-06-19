import React from "react";
import styles from "./Style.module.css";

const ProfessionalInfo = ({ data }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Contact Information</div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Referred by ISLL Employee:</span>
                <span className={styles.valueWrap}>
                  {data?.is_referred ? data?.is_referred : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Referrer Designation:</span>
                <span className={styles.valueWrap}>
                  {data?.referer_designation ? data?.referer_designation : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Referrer Location:</span>
                <span className={styles.valueWrap}>
                  {data?.referer_location ? data?.referer_location : "-"}
                </span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Referrer Name:</span>
                <span className={styles.valueWrap}>
                  {data?.referer_name ? data?.referer_name : "-"}
                </span>
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Referrer Department:</span>
                <span className={styles.valueWrap}>
                  {data?.referer_department ? data?.referer_department : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>
                  Covered under any kind bond/contract:
                </span>
                <span className={styles.valueWrap}>
                  {data?.is_bond ? data?.is_bond : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Date of expiry:</span>
                <span className={styles.valueWrap}>
                  {data?.bond_expiry_date ? data?.bond_expiry_date : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>
                  Any history of prosecution, fined or conviction by a court of{" "}
                  <br /> law for any offence:
                </span>
                <span className={styles.valueWrap}>
                  {data?.is_convicted ? data?.is_convicted : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Details of pending case:</span>
                <span className={styles.valueWrap}>
                  {data?.pending_case_brief ? data?.pending_case_brief : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>
                  Do you possess a personal transport:
                </span>
                <span className={styles.valueWrap}>
                  {data?.is_personal_transport
                    ? data?.is_personal_transport
                    : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Specify transport details:</span>
                <span className={styles.valueWrap}>
                  {data?.transport_details ? data?.transport_details : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>
                  Suffering from any ailments:
                </span>
                <span className={styles.valueWrap}>
                  {data?.is_ailments ? data?.is_ailments : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Type:</span>
                <span className={styles.valueWrap}>
                  {data?.ailment_type ? data?.ailment_type : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Specify Details</span>
                <span className={styles.valueWrap}>
                  {data?.ailment_details ? data?.ailment_details : "-"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Any relative working in the ISLL:</span>
                <span className={styles.valueWrap}>
                  {data?.is_any_relative ? data?.is_any_relative : "N/A"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Relative Designation:</span>
                <span className={styles.valueWrap}>
                  {data?.relative_designation ? data?.relative_designation : "-"}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Relation (If applicable):</span>
                <span className={styles.valueWrap}>
                  {data?.relative_location ? data?.relative_location : "-"}
                </span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Relative Name:</span>
                <span className={styles.valueWrap}>
                  {data?.relative_name ? data?.relative_name : "-"}
                </span>
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Relative Department:</span>
                <span className={styles.valueWrap}>
                  {data?.relative_department ? data?.relative_department : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfo;
