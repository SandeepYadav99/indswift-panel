import React, { useMemo } from "react";
import useEmployeeList from "./DescriptionView.js";
import PageBox from "../../../../components/PageBox/PageBox.component";
import { ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import styles from "./Style.module.css";
import DesDialog from "./component/DesDialog/DesDialog.view.js";
import DesList from "./List/DesList.js";

function DescriptionViewTable() {
  const { data, location, decDialog, toggleDecDialog, empId,fetchData } = useEmployeeList(
    {}
  );

  const listArr = useMemo(() => {
    return data?.map((item, index) => {
      return <DesList data={item} key={`des_${index}`} />;
    });
  }, [data]);

  return (
    <div>
      <DesDialog isOpen={decDialog} handleToggle={toggleDecDialog} fetchData={fetchData}/>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Description List</span>
            <div className={styles.newLine} />
          </div>
          {location?.pathname !== "/my/profile" && (
            <div>
              <ButtonBase
                aria-haspopup="true"
                onClick={toggleDecDialog}
                className={"createBtn"}
              >
                Add
                <Add fontSize={"small"} className={"plusIcon"}></Add>
              </ButtonBase>
            </div>
          )}
        </div>
        <div className={styles.EmployeeListWrapper}>{listArr}</div>
      </PageBox>
    </div>
  );
}

export default DescriptionViewTable;
