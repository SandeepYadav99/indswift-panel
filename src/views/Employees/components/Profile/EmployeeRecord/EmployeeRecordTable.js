import React, { useMemo } from "react";
import useEmployeeList from "./EmployeeRecordHook";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../../components/SidePanel/SidePanel.component";
import CreateView from "./component/Employee.view";
import EmployeeList from "./EmployeeList.js";
import noCPCimage from "./../../../../../assets/img/ic_no cpc info.png";

function EmployeeRecordTable({empId}) {
  const { isSidePanel, handleSideToggle, data } = useEmployeeList({empId});


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

  const listArr = useMemo(() => {
    return data.map((item) => {
      return (<EmployeeList
          data={item}
      />)
    })
  }, [data]);

  return (
    <>
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Letters List</span>
            <div className={styles.newLine} />
          </div>
          <div>
            {/*<ButtonBase onClick={handleSideToggle} className={"createBtn"}>*/}
            {/*  CREATE <Add fontSize={"small"} className={"plusIcon"}></Add>*/}
            {/*</ButtonBase>*/}
          </div>
        </div>
        <br />
        <br />
        <div className={styles.EmployeeListWrapper}>
          {listArr}
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
    </>
  );
}

export default EmployeeRecordTable;
