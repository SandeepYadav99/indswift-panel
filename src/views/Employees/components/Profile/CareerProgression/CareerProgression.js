import React, {useMemo} from "react";
import LineStatComponent from "../../../../dashboard/components/LineStat/LineStat.component";
import CareerMonthlyCard from "./components/CareerMonthlyCard/CareerMonthlyCard";
import CareerTile from "./components/CareerTile/CareerTile";
import styles from "./Style.module.css";
import firstImg from "../../../../../assets/img/ic_emp cagr.png";
import secondImg from "../../../../../assets/img/ic_org cagr.png";
import thirdImg from "../../../../../assets/img/ic_manpower cagr.png";
import useCareerProgression from "./CareerProgressionHook";


function CareerProgression({}) {
  const { otherData, history, lineStatistics } = useCareerProgression({});

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Test'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Test'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    }
  }
  // [{ date: 'abc', count: 30 }, { date: 'abc', count: 30 }]

  const annualTransition = useMemo(() => {
    return history.map((data, index) => {
     return ((<CareerMonthlyCard data={data} isLast={index +1 === history.length} />))
    });
  }, [history]);

  return (
    <div className={styles.careerWrapper}>
      <div className={styles.careerProgressionWrapper}>
        <div className={styles.careerHeading}>
          <div>
            <span className={styles.title}>Overview</span>
            <div className={styles.newLine} />
          </div>
          {/* <div>hdfks</div> */}
        </div>
        <div className={styles.InfoContainer}>
          <div className={styles.InfoWrapper}>
            <CareerTile name="Employee CAGR" image={firstImg} percentage={otherData?.employee_cagr} />
            <CareerTile name="Organisation CAGR" image={secondImg} percentage={otherData?.cagr} />
            <CareerTile name="Manpower Cost CAGR" image={thirdImg} percentage={otherData?.cost_cagr} />
          </div>
      <div className={styles.horizontalLine}></div>
          <div className={styles.chartWrapper}>
            <LineStatComponent data={lineStatistics}  options={options}/>
          </div>
        </div>
      </div>
      <div className={styles.careerProgressionWrapper}>
        <div className={styles.careerHeading}>
          <div>
            <span className={styles.title}>Detailed View</span>
            <div className={styles.newLine} />
          </div>
        </div>
        <div className={styles.CareerMonthlyCardWrapper}>
          {annualTransition}
        </div>
      </div>
    </div>
  );
}

export default CareerProgression;
