import React, { useEffect, useState } from "react";

import styles from "./Style.module.css";
import StatusPill from "../../components/Status/StatusPill.component";
import WaitingComponent from "../../components/Waiting.component";
import { serviceGetBudgetPendingDetails } from "../../services/BudgetPending.service";
import { ButtonBase } from "@material-ui/core";

const BudgetDetail = ({ annualId, closeSidePanel,requestRaisedApi }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (annualId) {
      setIsLoading(true);
      let req = serviceGetBudgetPendingDetails({ id: annualId });
      req.then((res) => setData(res?.data));
      setIsLoading(false);
    }
  }, [annualId]);

  if (isLoading) {
    return <WaitingComponent />;
  }

  return (
    <div className={styles.detailWrap}>
      <div className={styles.upperInfo}>
        <div>{data?.fy_year}</div>
        {data?.length > 0 && <div>On Roll Employee</div>}
      </div>

      <div>
        <div className={styles.loc}>{data?.location?.name}</div>
        <div className={styles.loc}>{data?.department?.name}</div>
        <div className={styles.hr}>{data?.sub_department?.name}</div>
      </div>
      <div className={styles.loc21}>Change Log</div>
      <div className={styles.plainPaper}>
        <div className={styles.approved}>Updated the Approved Budget</div>
        <div className={styles.newInfo}>
          <div className={styles.titleOld}>OLD</div>
          <div className={styles.outerWrap}>
            <span className={styles.key}>Approved:</span>
            {data?.old_values?.budget}
          </div>
          <div className={styles.outerWrap}>
            <span className={styles.key}>Posted:</span>
            {data?.old_values?.posted}
          </div>
          <div className={styles.outerWrap}>
            <span className={styles.key}>Transferred:</span>
            {data?.old_values?.transferred}
          </div>
          <div className={styles.outerWrap}>
            <span className={styles.key}>Vacancy:</span>
            {data?.old_values?.vacancies}
          </div>
          <div className={styles.outerWrap}>
            <span className={styles.key}>Approved Budget:</span>
            {data?.old_values?.expense_budget}
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.newInfo}>
            <div className={styles.titleOld}>New</div>
            <div className={styles.outerWrap}>
              <span className={styles.key}>Approved:</span>
              {data?.new_values?.budget}
            </div>
            <div className={styles.outerWrap}>
              <span className={styles.key}>Posted:</span>
              {data?.new_values?.posted}
            </div>
            <div className={styles.outerWrap}>
              <span className={styles.key}>Transferred:</span>
              {data?.new_values?.transferred}
            </div>
            <div className={styles.outerWrap}>
              <span className={styles.key}>Vacancy:</span>
              {data?.new_values?.vacancies}
            </div>
            <div className={styles.outerWrap}>
              <span className={styles.key}>Approved Budget:</span>
              <b>{data?.new_values?.expense_budget}</b>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btnWrap}>
        <ButtonBase
          type={"button"}
          onClick={()=>requestRaisedApi("Reject")}
          className={styles.RejectBtn}
        >
          Reject
        </ButtonBase>
        <ButtonBase
          type={"button"}
          onClick={()=>requestRaisedApi("Approved")}
          className={styles.createBtn}
        >
          Approve
        </ButtonBase>
      </div>
    </div>
  );
};

export default BudgetDetail;
