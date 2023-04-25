import React from "react";
import styles from "./Style.module.css";
import { getSumValue } from "../../../../../libs/general.utils";
function SalaryDetails({ data }) {
  const prefixRs = (value) => {
    if (value === 0) {
      return "Rs 0";
    }
    if (value) {
      return `Rs ${value}`;
    }
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.newContainerPersonal}>
        <div className={styles.mainFlex2}>
          <div className={styles.left}>
            <div className={styles.heading}>CTC Details</div>
            <div className={styles.key21}>
              <span className={styles.value21}>Gross:</span>
              <span className={styles.valueWrap21}>
                {prefixRs(
                  getSumValue(
                    data?.salary?.earning_one,
                    data?.salary?.earning_two
                  )
                )}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>PLI:</span>
              <span className={styles.valueWrap21}>
                {prefixRs(getSumValue(data?.salary?.earning_three_pli))}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>Stability Allowance:</span>
              <span className={styles.valueWrap21}>
                {prefixRs(getSumValue(data?.salary?.stability_incentive))}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>
                Others (Er PF, Gratuity, Bonus, MC):
              </span>
              <span className={styles.valueWrap21}>
                {prefixRs(
                  getSumValue(
                    data?.salary?.earning_four,
                    data?.salary?.earning_five,
                    -(data?.salary?.stability_incentive)
                  )
                )}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>Total CTC: </span>
              <span className={styles.valueWrap21}>
                {prefixRs(
                  getSumValue(
                    data?.salary?.earning_one,
                    data?.salary?.earning_two,
                    data?.salary?.earning_four,
                    data?.salary?.earning_five,
                    data?.salary?.earning_three_pli
                  )
                )}
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.heading}>Additional Details</div>

            <div className={styles.key21}>
              <span className={styles.value21}>
                Annualized Value Change from Replaced Cost:
              </span>
              <span className={styles.valueWrap21}>
              {!data.replacing_person?.name ? 'N/A ':prefixRs(data?.salary_change?.annual_replaced_change)}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>
                % Change from Replaced Cost:
              </span>
              {
                <span className={styles.valueWrap21}>
                  {
                    !data.replacing_person?.name ? 'N/A ' : 
                    data?.salary_change?.annual_replaced_percentage !== undefined
                      ? `${data?.salary_change?.annual_replaced_percentage} %`
                      : ""
                  }
                  
                </span>
              }
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>
                Annualized Value Change WRT past CTC:
              </span>
              <span className={styles.valueWrap21}>
                {prefixRs(data?.salary_change?.annual_past_change)}
              </span>
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>
                % Hike Offered to Candidate WRT past CTC:
              </span>
              {data?.salary_change?.hike_percentage &&
                data?.salary_change?.hike_percentage !== undefined && (
                  <span className={styles.valueWrap21}>
                    {`${data?.salary_change?.hike_percentage} %`}
                  </span>
                )}
            </div>
            <div className={styles.key21}>
              <span className={styles.value21}>AMRF Available:</span>
              <span className={styles.valueWrap21}>
                {data?.is_amrf ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryDetails;
