import React from 'react';
import styles from './Style.module.css';
import LocationCard from "./components/LocationCard/LocationCard.view";
import PendingOfferTable from "./components/WarehouseTables/PendingOfferTable.component";
import InterviewsTable from "./components/WarehouseTables/InterviewsTable.component";

const NewDashboard = () => {

    const _renderTopCards = () => {
        return (
            <div className={styles.dashboardFlex}>
                <div className={styles.dashboardFlex}>
                    <div className={styles.plainPaper}>
                        <div className={styles.whiteFlex}>
                            <div className={styles.imgBox}>
                                <img src={require("../../assets/img/ic_total locations@2x.png")} height={50}/>
                            </div>
                            <div>
                                <div className={styles.number}>03</div>
                                <div className={styles.subText}>Total Locations</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.plainPaper}>
                        <div className={styles.whiteFlex}>
                            <div className={styles.imgBox}>
                                <img src={require("../../assets/img/ic_total employees@2x.png")} height={50}/>
                            </div>
                            <div>
                                <div className={styles.number}>2.4k</div>
                                <div className={styles.subText}>Total Employees</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.plainPaper} style={{display:'flex'}}>
                    <div className={styles.whiteFlex} style={{flex:1}}>
                        <div className={styles.imgBox}>
                            <img src={require("../../assets/img/ic_total interviews@2x.png")} height={50}/>
                        </div>
                        <div>
                            <div className={styles.number}>28</div>
                            <div className={styles.subText}>Total Locations</div>
                        </div>
                    </div>
                    <div className={styles.vertical}></div>
                    <div style={{flex: 1}}>
                        <div className={styles.numberFlex}>
                            <div>
                                <div className={styles.num}>02</div>
                                <div className={styles.subText}>Today</div>
                            </div>
                            <div>
                                <div className={styles.num}>06</div>
                                <div className={styles.subText}>This Week</div>
                            </div>
                            <div>
                                <div className={styles.num}>12</div>
                                <div className={styles.subText}>This Month</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {_renderTopCards()}

            <div className={styles.newFlex}>
                <LocationCard/>
                <LocationCard/>
                <LocationCard/>
            </div>

            <div className={styles.tableFlex}>
                <div className={styles.lhs}>
                    <PendingOfferTable/>
                </div>
                <div className={styles.rhs}>
                    <InterviewsTable/>
                </div>
            </div>

        </div>
    )
}

export default NewDashboard
