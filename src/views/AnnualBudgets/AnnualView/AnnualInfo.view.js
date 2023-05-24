import React, {
  useEffect,
  useState,
} from "react";
import {
  serviceGetDetailTrans,
} from "../../../services/Annual.service";
import WaitingComponent from "../../../components/Waiting.component";
import Constants from "../../../config/constants";
import styles from "../Style.module.css";
import classnames from "classnames";
import StatusPill from "../../../components/Status/StatusPill.component";

const AnnualInfo = ({ annualId, closeSidePanel }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (annualId) {
      setIsLoading(true);
      let req = serviceGetDetailTrans({ index: 1, annual_budget_id: annualId });
      req.then((res) => setData(res?.data));
      setIsLoading(false);
    }
  }, [annualId]);

  if (isLoading) {
    return <WaitingComponent />;
  }
  const updateText = (value) => {
    if (value) {
      if (value === "SUBMITTED") {
        return "Updated the Annual Budget";
      } else if (value === "SANCTIONED") {
        return "Approved the Submitted Records";
      } else {
        return "Rejected the Annual Budget";
      }
    }
  };
  return (
    <div>
      <div className={styles.upperInfo}>
        <div>{data[0]?.fy_year}</div>
        {data?.length > 0 && <div>On Roll Employee</div>}
      </div>

      <div>
        <div className={styles.loc}>{data[0]?.location?.name}</div>
        <div className={styles.loc}>{data[0]?.department?.name}</div>
        <div className={styles.hr}>{data[0]?.sub_department?.name}</div>
      </div>
      <br />
      {data?.length > 0 &&
        data?.map((item, index) => (
          <div className={styles.plainPaper} key={`annual_${index}`}>
            <div className={styles.topFlex}>
              <div className={styles.approved}>{updateText(item?.status)}</div>
              <div>
                <StatusPill status={item?.status} />
              </div>
            </div>

            <div className={styles.newInfo}>
              <div>
                <span className={styles.key}>Approved:</span>
                {item?.budget}
              </div>
              <div>
                <span className={styles.key}>Posted:</span>
                {item?.posted}
              </div>
              <div>
                <span className={styles.key}>Transferred:</span>
                {item?.transferred}
              </div>
              <div>
                <span className={styles.key}>Vacancy:</span>
                {item?.vacancies}
              </div>
              <div>
                <span className={styles.key}>Approved Budget:</span>
                {item?.expense_budget}
              </div>
            </div>

            <div className={styles.btmFlex}>
              <div className={styles.user}>
                <div>
                  <b>{item?.editedBy?.name}</b>
                  <br />
                  <b>{item?.editedBy?.code}</b>
                </div>
              </div>
              <div>{item?.createdAtText}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnnualInfo;
