import React, { useMemo, useState,useEffect } from "react";
import LineStatComponent from "../../../../dashboard/components/LineStat/LineStat.component";
import CareerMonthlyCard from "./components/CareerMonthlyCard/CareerMonthlyCard";
import CareerTile from "./components/CareerTile/CareerTile";
import styles from "./Style.module.css";
import firstImg from "../../../../../assets/img/ic_emp cagr.png";
import secondImg from "../../../../../assets/img/ic_org cagr.png";
import thirdImg from "../../../../../assets/img/ic_manpower cagr.png";
import useCareerProgression from "./CareerProgressionHook";
import noCPCimage from "./../../../../../assets/img/ic_no cpc info.png";
import { Button, Dialog, useMediaQuery, useTheme } from "@material-ui/core";



function CareerProgression({}) {
  const { otherData, history, lineStatistics, isLoading } =
    useCareerProgression({});
  const [open, setOpen] = useState(false);

  let otherValues = otherData ? Object.values(otherData) : [];
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Test",
        },
      },
      x: {
        title: {
          display: true,
          text: "Test",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  // [{ date: 'abc', count: 30 }, { date: 'abc', count: 30 }]

  const annualTransition = useMemo(() => {
    return [...history].reverse().map((data, index) => {
      return (
        <CareerMonthlyCard
          data={data}
          isFirst={index === 0}
          isLast={index + 1 === history.length}
        />
      );
    });
  }, [history]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const theme = useTheme();
  const isBelow769 = useMediaQuery(theme.breakpoints.down(768));

  const dialogStyle = {
    width: isBelow769 ? '100vw' : 'auto',
    maxWidth: isBelow769 ? '100vw' : 'md',
  };

  const PopupComponent = () => {
  
    return (
         <Dialog
        open={open}
        onClose={handleClose}
        id={styles.paperwidthData}
        style={dialogStyle}
      >
          <div className={styles.GeneralInfoWrapeer}>
            <div className={styles.alignDataToWrapper}>
              <div>
                <span className={styles.title2}> </span>
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <LineStatComponent data={lineStatistics} options={options} />
            </div>
          </div>
        </Dialog>
    );
  };

  return !history.length ? (
    <div className={styles.careerWrapperCPc}>
      <div className={styles.imageWrapperCpc}>
        <img src={noCPCimage} />
        <div className={styles.titleWrpapper}>
          <span className={styles.noCpcTitle}>No Information Available</span>
          <span className={styles.noCpcdec}>
            Currently no CPC Inofrmation is available
          </span>
        </div>
      </div>
    </div>
  ) : (
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
            <CareerTile
              name="Employee CAGR"
              image={firstImg}
              percentage={otherData?.employee_cagr}
            />
            <CareerTile
              name="Organisation CAGR"
              image={secondImg}
              percentage={otherData?.cagr}
            />
            <CareerTile
              name="Manpower Cost CAGR"
              image={thirdImg}
              percentage={otherData?.cost_cagr}
            />
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={styles.chartWrapper}>
            <LineStatComponent data={lineStatistics} options={options} />
          </div>
          <div className={styles.viewGraphBtn}>
            <Button onClick={handleOpen}> View Graph</Button>
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
      {open && <PopupComponent />}
    </div>
  );
}

export default CareerProgression;
