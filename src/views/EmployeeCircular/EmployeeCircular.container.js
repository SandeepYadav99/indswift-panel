import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import EmployeeCircularHook from "./EmployeeCircularHook";
import styles from "./Style.module.css";
import Circularimages from "../../assets/img/circulars illustration.png";
import FilterComponent from "../../components/Filter/Filter.component";
import PageBox from "../../components/PageBox/PageBox.component";

function EmployeeCircular() {
  const { data } = EmployeeCircularHook();
  return (
    <div className={styles.EmployeeCircularWrapper}>
      <InformationCard
        heading="HR Policies"
        imageUrl={Circularimages}
        data={data}
      />
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Circulars List</span>
              <div className={styles.newLine} />
            </div>
          </div>

          <div>
            {/* <div>
                            <br/>
                            <div style={{width: '100%'}}>
                                <DataTables
                                    {...tableData.datatable}
                                    {...tableData.datatableFunctions}
                                />
                            </div>
                        </div> */}
          </div>
        </PageBox>
      </div>
    </div>
  );
}

export default EmployeeCircular;
