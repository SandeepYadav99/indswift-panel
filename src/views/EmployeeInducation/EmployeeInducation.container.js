import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import EmployeeInducationHook from "./EmployeeInducationHook";
import styles from "./Style.module.css";

function EmployeeInducation() {
  const { data, employeeData } = EmployeeInducationHook({});

  return (
    <div>
      <InformationCard
        heading="Employee Engagement Events"
        imageachorTag={employeeData?.document}
        imageUrl={employeeData?.cover_image}
        productLink="View Induction Booklet"
        data={data}
        customClass={styles.imageDimensions}
      />
    </div>
  );
}

export default EmployeeInducation;
