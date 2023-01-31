import React from "react";
import InformationCard from "../../components/InformationCard/InformationCard.component";
import EmployeeHRPolicyHook from "./EmployeeHRPolicyHook";
import styles from "./Style.module.css";
import images from "../../assets/img/hr policies illustartion.png";
import PageBox from "../../components/PageBox/PageBox.component";
import DataTables from "../../Datatables/Datatable.table";
import FilterComponent from "../../components/Filter/Filter.component";

function EmployeeHRPolicy() {
  const { data } = EmployeeHRPolicyHook();

  return (
    <div className={styles.EmployeeHRWrapper}>
      <InformationCard heading="HR Policies" imageUrl={images} data={data} />
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Policies List</span>
              <div className={styles.newLine} />
            </div>
          </div>

          <div>
            <FilterComponent
            // is_progress={isFetching}
            // filters={configFilter}
            // handleSearchValueChange={handleSearchValueChange}
            // handleFilterDataChange={handleFilterDataChange}
            />
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

export default EmployeeHRPolicy;
