import { ButtonBase, MenuItem, TextField } from "@material-ui/core";
import React,{useEffect} from "react";
import useCandidateInfo from "./CandidateInfo.hook";
import styles from "./Style.module.css";
import UpperDetail from "./component/UpperDetail";
import PersonalInfo from "./component/Info/CandidatePersonalInfo";
import ContactInfo from "./component/Info/ContactInfo";
import FamilyInfo from "./component/Info/CandFamily";
import QualificationDetails from "./component/Info/QualificationDetails";
import ProfessionalInfo from "./component/Info/ProfessionalInfo";
import HistoryInfo from "./component/Info/HistoryInfo";
import SalaryInfo from "./component/Info/SalaryInfo";
import OtherInfo from "./component/Info/OtherInfo";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



function CandidateInfo() {
  const { handlePreviousPage, personalData } = useCandidateInfo({});

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault(); 

        const content = document.getElementById('content-to-print');

        const canvas = await html2canvas(content);

        const pdf = new jsPDF('p', 'mm', 'a4');

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="CandidateInfoWrappers" id="content-to-print">
      <div className={styles.employeeLoginWrapper}>
        <div className={styles.employeeLoginContainer}>
          <div className={styles.logoImg}>
            <img
              src={require("../../../assets/img/login logo@2x.png")}
              className={styles.sky}
            />
          </div>
          <div className={styles.loginSignupText}>
            <h1 className={styles.headingText}>Employment Application Form</h1>
          </div>
        </div>
      </div>
      <UpperDetail data={personalData} />
      <div className={styles.infoWrap}>
        <div className={styles.lhs}>
          <PersonalInfo data={personalData?.eaf} />
          <FamilyInfo family={personalData?.eaf?.family} />
          <ProfessionalInfo data={personalData?.eaf?.professional_details} />
          <OtherInfo data={personalData?.eaf?.additional_data} />
        </div>
        <div className={styles.rhs}>
          <ContactInfo contact={personalData?.eaf?.contact} />
          <QualificationDetails data={personalData?.eaf?.qualification} other={personalData?.eaf?.other_professional_certifications}/>
          <HistoryInfo data={personalData?.eaf?.employment_history} />
          <SalaryInfo data={personalData?.eaf} />
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.btnCont}>
          <ButtonBase
            // disabled={isSubmitting}
            type={"button"}
            onClick={handlePreviousPage}
            className={styles.createBtn}
          >
            CLOSE
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}

export default CandidateInfo;
