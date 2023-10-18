import React, { useMemo } from "react";
import useEmployeeList from "./EmployeeRecordHook";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../../components/SidePanel/SidePanel.component";
import EmployeeList from "./EmployeeList.js";
import EmployeeView from "./component/Employee.view";
import EmployeeEditForm from "./component/EmployeeEditForm/EmployeeEditForm.view";

function EmployeeRecordTable({ empId }) {
  const {
    isSidePanel,
    handleSideToggle,
    data,
    createDD,
    handleAddCandidate,
    handleClosedownloadCL,
    type,
    location,
    handleEditToggle,
    isEditPanel,
    selectedEmp,
    setSelectEmp,
    role
  } = useEmployeeList({ empId });

  const renderCreateForm = useMemo(() => {
    return <EmployeeView closeSidePanel={handleSideToggle} Formtype={type} />;
  }, [type]);

  const listArr = useMemo(() => {
    return data?.map((item) => {
      return <EmployeeList data={item} handleEditToggle={handleEditToggle} role={role}/>;
    });
  }, [data,role]);

  const renderEditForm = useMemo(() => {
    return (
      <EmployeeEditForm closeSidePanel={handleEditToggle} data={selectedEmp}/>
    );
  }, [isEditPanel,selectedEmp,setSelectEmp]);

  return (
    <>
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Letters List</span>
              <div className={styles.newLine} />
            </div>
            {location?.pathname !== "/my/profile" && (
              <div>
                <ButtonBase
                  aria-owns={createDD ? "createDD" : undefined}
                  aria-haspopup="true"
                  onClick={handleAddCandidate}
                  className={"createBtn"}
                >
                  Create
                  <Add fontSize={"small"} className={"plusIcon"}></Add>
                </ButtonBase>
                <Menu
                  id="createDD"
                  anchorEl={createDD}
                  open={Boolean(createDD)}
                  onClose={handleClosedownloadCL}
                >
                  <MenuItem
                    onClick={() => {
                      handleSideToggle("RECORD");
                    }}
                  >
                    Record
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleSideToggle("STAR");
                    }}
                  >
                    PMS Star
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
          <br />
          <br />
          <div className={styles.EmployeeListWrapper}>{listArr}</div>
        </PageBox>
        <SidePanelComponent
          handleToggle={handleSideToggle}
          title={type === "STAR" ? "Add PMS Star" : "Upload Employee Records"}
          open={isSidePanel}
          side={"right"}
        >
          {isSidePanel && renderCreateForm}
        </SidePanelComponent>

        <SidePanelComponent
          handleToggle={handleEditToggle}
          title={selectedEmp?.star_type ? "Add PMS Star" : "Upload Employee Records"}
          open={isEditPanel}
          side={"right"}
        >
          {isEditPanel && renderEditForm}
        </SidePanelComponent>
        ,
      </div>
    </>
  );
}

export default EmployeeRecordTable;
