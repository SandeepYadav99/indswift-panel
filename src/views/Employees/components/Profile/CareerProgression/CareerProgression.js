import React from "react";
import LineStatComponent from "../../../../dashboard/components/LineStat/LineStat.component";
import CareerMonthlyCard from "./components/CareerMonthlyCard/CareerMonthlyCard";
import CareerTile from "./components/CareerTile/CareerTile";
import styles from "./Style.module.css";
import firstImg from "../../../../../assets/img/ic_emp cagr.png";
import secondImg from "../../../../../assets/img/ic_org cagr.png";
import thirdImg from "../../../../../assets/img/ic_manpower cagr.png";


function CareerProgression() {
  const data = [
    {
      date: "06/2010",
      count: 650004,
    },
    {
      date: "04/2011",
      count: 853008,
    },
    {
      date: "04/2012",
      count: 888450,
    },
    {
      date: "04/2013",
      count: 1006868,
    },
    {
      date: "04/2014",
      count: 1115281,
    },
    {
      date: "04/2015",
      count: 1244617,
    },
    {
      date: "04/2016",
      count: 1378001,
    },
    {
      date: "04/2017",
      count: 1614979,
    },
    {
      date: "04/2018",
      count: 1844427,
    },
  ];
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
            <CareerTile name="Employee CAGR" image={firstImg} percentage="14" />
            <CareerTile name="Organisation CAGR" image={secondImg} percentage="7"/>
            <CareerTile name="Manpower Cost CAGR" image={thirdImg} percentage="10"/>
          </div>
      <div className={styles.horizontalLine}></div>

          <div className={styles.chartWrapper}>
            <LineStatComponent data={data}  options={options}/>
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
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard />
          <CareerMonthlyCard lastCard={true}/>
        </div>
      </div>
    </div>
  );
}

export default CareerProgression;
