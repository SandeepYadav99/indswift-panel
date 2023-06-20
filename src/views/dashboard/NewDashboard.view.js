import React, { useEffect, useMemo } from "react";
import styles from "./Style.module.css";
import LocationCard from "./components/LocationCard/LocationCard.view";
import PendingOfferTable from "./components/WarehouseTables/PendingOfferTable.component";
import InterviewsTable from "./components/WarehouseTables/InterviewsTable.component";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import { serviceGetInterviewStatus } from "../../services/Dashboard.service";
import { useState } from "react";

const NewDashboard = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { tiles } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(actionGetDashboard());
  }, []);
  useEffect(() => {
    let dataValues = serviceGetInterviewStatus();
    dataValues
      .then((data) => {
        setData(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const _renderTopCards = () => {
    return (
      <div className={styles.dashboardFlex}>
        <div className={styles.dashboardFlex}>
          <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_total locations@2x.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.locations}</div>
                <div className={styles.subText}>Total Locations</div>
              </div>
            </div>
          </div>

          <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_total employees@2x.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.employees}</div>
                <div className={styles.subText}>Total Employees</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.plainPaper} style={{ display: "flex" }}>
          <div className={styles.whiteFlex} style={{ flex: 1 }}>
            <div className={styles.imgBox}>
              <img
                src={require("../../assets/img/ic_total interviews@2x.png")}
                height={50}
              />
            </div>
            <div>
              <div className={styles.number}>{data?.total}</div>
              <div className={styles.subText}>Total Interviews</div>
            </div>
          </div>
          <div className={styles.vertical}></div>
          <div style={{ flex: 1 }}>
            <div className={styles.numberFlex}>
              <div>
                <div className={styles.num}>{data?.today}</div>
                <div className={styles.subText}>Today</div>
              </div>
              <div>
                <div className={styles.num}>{data?.week}</div>
                <div className={styles.subText}>This Week</div>
              </div>
              <div>
                <div className={styles.num}>{data?.month}</div>
                <div className={styles.subText}>This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const locationData = useMemo(() => {
    return tiles?.locationData?.map((val) => {
      return <LocationCard data={val} />;
    });
  }, [tiles?.locationData]);

  return (
    <div>
      {_renderTopCards()}

      <div className={styles.newFlex}>{locationData}</div>
      <div className={styles.tableFlex21}>
        <div className={styles.dashboardFlex} style={{width:'100%'}}>
          <div className={styles.plainPaper221}>
            <div className={styles.activeWrapper}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_prc_active.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.prc_stats?.active}</div>
                <div className={styles.prcStatus} style={{color:'#E92828'}}>Active PRC's</div>
              </div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.activeWrapper}>
              <div className={styles.imgBox2}>
                <img
                  src={tiles?.prc_stats?.last_avg_tat >= tiles?.prc_stats?.avg_tat ? require("../../assets/img/ic_decrease.png") : require("../../assets/img/ic_increase.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.prc_stats?.avg_tat}</div>
                <div className={styles.prcStatus}>Avg TAT (Days)</div>
              </div>
            </div>
          </div>
          <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_prc_closed.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.prc_stats?.closed}</div>
                <div className={styles.prcStatus} style={{color:'#29CB97'}} >Closed PRC's</div>
              </div>
            </div>
          </div>
          <div className={styles.plainPaper}>
            <div className={styles.whiteFlex}>
              <div className={styles.imgBox}>
                <img
                  src={require("../../assets/img/ic_prc_inactive.png")}
                  height={50}
                />
              </div>
              <div>
                <div className={styles.number}>{tiles?.prc_stats?.inactive}</div>
                <div className={styles.prcStatus} style={{color:'#FA8B0C'}}>Inactive PRC's</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tableFlex21}>
        <div className={styles.lhsPending}>
          <PendingOfferTable />
        </div>
        <div className={styles.rhsInterview}>
          <InterviewsTable />
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
