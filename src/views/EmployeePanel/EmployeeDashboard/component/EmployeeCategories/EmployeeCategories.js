import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Style.module.css";

function EmployeeCategories() {
  const [hoveredDrishti, setHoveredDrishti] = useState(false);
  const [hoveredDeepak, setHoveredDeepak] = useState(false);
  const [hoveredUtsav, setHoveredUtsav] = useState(false);
  const [hoveredIkigai, setHoveredIkigai] = useState(false);

  const handleHoverDrishti = () => {
    setHoveredDrishti(true);
  };
  const handleHoverDeepak = () => {
    setHoveredDeepak(true);
  };
  const handleHoverUtsav = () => {
    setHoveredUtsav(true);
  };
  const handleHoverIkigai = () => {
    setHoveredIkigai(true);
  };

  const handleMouseLeaveDrishti = () => {
    setHoveredDrishti(false);
  };
  const handleMouseLeaveDeepak = () => {
    setHoveredDeepak(false);
  };
  const handleMouseLeaveutsav = () => {
    setHoveredUtsav(false);
  };
  const handleMouseLeaveIkigai = () => {
    setHoveredIkigai(false);
  };
  return (
    <div className={styles.employeeCategoriesContainer}>
      <div>
        <span className={styles.title}>IndSwift - E3M</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.employeeCategoriesLower}>
        <div
          value="drishti"
          className={styles.employeeCategoriesCardWrapper}
          onMouseEnter={handleHoverDrishti}
          onMouseLeave={handleMouseLeaveDrishti}
        >
          <Link
            to="/employee/drishti"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                {!hoveredDrishti ? (
                  <img
                    src={require("../../../../../assets/img/drishti_grey.png")}
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/img/ic_drishti_white (1).png")}
                  />
                )}
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>DRISHTI</span>
                <span className={styles.categories}>Employee Welfare</span>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={styles.employeeCategoriesCardWrapper}
          onMouseEnter={handleHoverDeepak}
          onMouseLeave={handleMouseLeaveDeepak}
        >
          <Link
            to="/employee/deepak"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                {hoveredDeepak ? (
                  <img
                    src={require("../../../../../assets/img/ic_deepak_white (1).png")}
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/img/Group 20080.png")}
                  />
                )}
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>DEEPAK</span>
                <span className={styles.categories}>Social Welfare</span>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={styles.employeeCategoriesCardWrapper}
          onMouseEnter={handleHoverUtsav}
          onMouseLeave={handleMouseLeaveutsav}
        >
          <Link
            to="/employee/utsav"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                {hoveredUtsav ? (
                  <img
                    src={require("../../../../../assets/img/ic_utsav_white.png")}
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/img/ic_utsav_grey.png")}
                  />
                )}
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>UTSAV</span>
                <span className={styles.categories}>Employee Engagement</span>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={styles.employeeCategoriesCardWrapper}
          onMouseEnter={handleHoverIkigai}
          onMouseLeave={handleMouseLeaveIkigai}
        >
          <Link
            to="/employee/ikigai"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                {hoveredIkigai ? (
                  <img
                    src={require("../../../../../assets/img/ic_ikigai_white (1).png")}
                  />
                ) : (
                  <img
                    src={require("../../../../../assets/img/ikagai_grey.png")}
                  />
                )}
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>IKIGAI</span>
                <span className={styles.categories}>Employee Empowerment</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCategories;
