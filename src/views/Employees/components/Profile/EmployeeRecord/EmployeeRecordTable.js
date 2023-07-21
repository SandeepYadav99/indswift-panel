import React, { useMemo } from "react";
import useEmployeeList from "./EmployeeRecordHook";
import PageBox from "../../../../../components/PageBox/PageBox.component";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styles from "./Style.module.css";
import SidePanelComponent from "../../../../../components/SidePanel/SidePanel.component";
import EmployeeList from "./EmployeeList.js";
import EmployeeView from "./component/Employee.view";

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
    isCorporateAdminHR
  } = useEmployeeList({ empId });

  const renderCreateForm = useMemo(() => {
    return <EmployeeView closeSidePanel={handleSideToggle} Formtype={type} />;
  }, [type]);

  const listArr = useMemo(() => {
    return data?.map((item) => {
      return <EmployeeList data={item} />;
    });
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
            {(location?.pathname !== "/my/profile" && isCorporateAdminHR) && (
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
      </div>
    </>
  );
}

export default EmployeeRecordTable;
