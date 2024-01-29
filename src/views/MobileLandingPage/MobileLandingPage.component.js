import styles from "./styled.module.css";
import indiSwiftIcon from "../../assets/img/indswift family illustration.png"

const MobileLandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={indiSwiftIcon} alt="text" className={styles.widthImageAdjust}/>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
            <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}> My Profile</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Engage Dashboard</div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>My leave Application</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Claims</div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>HCM Module</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Circulars</div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>HR policies</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Knowledge Centre</div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Imprest</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Travel Planner</div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Attendance</div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.subPaper}>
          <div className={styles.imgBox}><img  alt="text"/></div>
            <div className={styles.text}>Loan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLandingPage;
