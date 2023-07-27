import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import logo from "../../../assets/img/login logo@2x.png";
import styles from "./Style.module.css";
import AwardTable from "./component/AwardTable/AwardTable.view";

const data = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const d2 = [
  {
    key: "0-0.4",
    received: 37,
    normalized: 41,
    overall_hod_rating: 59,
  },
  {
    key: "0.4-0.45",
    received: 4,
    normalized: 9,
    overall_hod_rating: 0,
  },
  {
    key: "0.45-0.5",
    received: 10,
    normalized: 2,
    overall_hod_rating: 0,
  },
];
const AwardSheetView = ({}) => {
  return (
    <div className={styles.awardWrrap}>
      <div className={styles.mainContainer}>
        <div className={styles.upper}>
          <div className={styles.imgWrap}>
            <img src={logo} alt="IndSwift" />
          </div>
          <div className={styles.textWrap}>
            <strong>Performance Feedback Sheet</strong>
            <span>For Performance cycle: June-2021 to May-2022</span>
          </div>
        </div>
        <div className={styles.verti}></div>
        <div className={styles.infoCont}>
          <div>
            Employee Name: <strong>Abhay Kashyap</strong>
          </div>
          <div>
            Employee Number: <strong>Abhay Kashyap</strong>
          </div>
          <div>
            Designation: <strong>Abhay Kashyap</strong>
          </div>
          <div>
            Location: <strong>Abhay Kashyap</strong>
          </div>
          <div>
            Department: <strong>Abhay Kashyap</strong>
          </div>
        </div>
        <div className={styles.verti}></div>
        <AwardTable title="functional Performance" data={d2} />
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AwardSheetView;
