import React from "react";
import { Link } from "react-router-dom";
import styles from "./Style.module.css";

function EmployeeCategories() {
  return (
    <div className={styles.employeeCategoriesContainer}>
      <div>
        <span className={styles.title}>IndSwift - E3M</span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.employeeCategoriesLower}>
        <div className={styles.employeeCategoriesCardWrapper}>
          <Link
            to="/employee/drishti"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                <img src={require("../../../../../assets/img/drishti_grey.png")} />
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>DRISHTI</span>
                <span className={styles.categories}>Employee Welfare</span>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.employeeCategoriesCardWrapper}>
          <Link
            to="/employee/deepak"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                <img src={require("../../../../../assets/img/Group 20080.png")} />
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>DEEPAK</span>
                <span className={styles.categories}>Social Welfare</span>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.employeeCategoriesCardWrapper}>
          <Link
            to="/employee/utsav"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                <img
                  src={require("../../../../../assets/img/ic_utsav_grey.png")}
                />
              </div>
              <div className={styles.categoriesDescription}>
                <span className={styles.employeeName}>UTSAV</span>
                <span className={styles.categories}>Employee Engagement</span>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.employeeCategoriesCardWrapper}>
          <Link
            to="/employee/ikigai"
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={styles.employeeCategoriesCard}>
              <div>
                <img src={require("../../../../../assets/img/ikagai_grey.png")} />
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
