import React, { useMemo } from "react";
import useEmployeeList from "./EmployeeRecordHook";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../../components/SidePanel/SidePanel.component";
import CreateView from "./component/Employee.view";
import EmployeeList from "./EmployeeList.js";

function EmployeeRecordTable() {
  const { isSidePanel, handleSideToggle } = useEmployeeList({});

  const renderCreateForm = useMemo(
    () => {
      return (
        <CreateView
          closeSidePanel={handleSideToggle}
          // handleDataSave={handleDataSave}
          // data={editData}
          // selectedAnnuals={selected}
          // originWarehouseId={warehouseId}
          // handleDelete={handleDelete}
        />
      );
    },
    [
      // handleDataSave,
      // editData,
      // warehouses,
      // handleDelete,
      // selected,
      // warehouseId,
    ]
  );

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Letters List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            <ButtonBase onClick={handleSideToggle} className={"createBtn"}>
              CREATE <Add fontSize={"small"} className={"plusIcon"}></Add>
            </ButtonBase>
          </div>
        </div>
        <br />
        <br />

        <div className={styles.grossWrapper}>
          <EmployeeList component="Incremental Gross Salary" monthly={20} />
          {/* <SaleryInfoField
            component="Car Component"
            monthly={data?.car_component}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total"
            monthly={getSumValue(
              data?.incremental_gross_salary,
              data?.car_component
            )} */}
          {/* /> */}
        </div>
      </PageBox>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Upload Employee Records"}
        open={isSidePanel}
        side={"right"}
      >
        {renderCreateForm}
      </SidePanelComponent>
    </div>
  );
}

export default EmployeeRecordTable;
