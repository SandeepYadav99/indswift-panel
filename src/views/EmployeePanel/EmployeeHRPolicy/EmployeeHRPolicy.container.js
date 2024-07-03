import React, { useState } from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeHRPolicyHook from "./EmployeeHRPolicyHook";
import images from "../../../assets/img/hr policies illustartion.png";
import FilterComponent from "../../../components/Filter/Filter.component";
import classNames from "classnames";
import { Button, ButtonBase, IconButton } from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { Dialog } from "@material-ui/core";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../components/Datatables/datatables.js";
import Constants from "../../../config/constants";
import StatusPill from "../../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";

function EmployeeHRPolicy() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    configFilter,
    handleSubDepartment,
    StaticPolicyData,
    employeeHRData,
  } = EmployeeHRPolicyHook({});

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const PopupComponent = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} style={{ width: "100%" }}>
          <div className={styles.GeneralInfoWrapeer}>
            <div className={styles.alignDataToWrapper}>
              <div>
                <span className={styles.title2}>HR Policies</span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                Human resource policies are formal rules and procedures that
                dictate how certain matters should be addressed in the
                workplace, including employee rights and duties. Without HR
                policies, a chaotic work environment could result because there
                are no set rules to follow. Employees must play their part by
                complying with the human resource policies that relate to them
              </p>
              <br />
              <p className={styles.infoDetails}>
                HR policies at Ind-Swift Laboratories Ltd are designed to
                promote communication and understanding between various
                hierarchical layers of organization. Policies are designed in
                most scientific manner after carefully reviewing the internal
                and external environment of the organization. Objective of HR
                Policies at Ind-Swift Laboratories Ltd is to establish and
                maintain consistent practices at the workplace
              </p>
              <br />
              <p className={styles.infoDetails}>
                HR policies and procedures of ISLL act as tactical elements of
                our strategic plan. On periodic basis policies of the
                organization undergo detailed review by HR department to align
                the policy provisions with changes in internal and external
                environment of the organization
              </p>
              <br />
              <p className={styles.infoDetails}>
                This section provides an open access of all HR Policies of the
                organization to all employees. Employees may use this medium to
                refer the policies as and when required in their day to day
                operations. The section will automatically be updated as and
                when any policy is changed so that employees are always
                available with recent set of guidelines.
              </p>
              <br />
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

  const renderFirstCell = useCallback((obj) => {
    if (obj) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span className={styles.productName}>{obj?.name}</span> <br />
            <span className={styles.productDate}>
              {obj?.effectiveDateText}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const mobileTableRender = ({ data, index }) => {
    return (
      <div className={styles.downFlex}>
        <div className={styles.cardDataTwo}>
          <div className={styles.descriptionData}>{renderFirstCell(data)} </div>
          <div>
            {" "}
            <ButtonBase
              style={{ "text-decoration": "none" }}
              onClick={() => {
                historyUtils.push(RouteName.VIEW_DOCUMENTS, {
                  url: data?.document,
                });
              }}
            >
              <Button color="primary" variant="contained" size="small">
                view
              </Button>
            </ButtonBase>
          </div>
        </div>
      </div>
    );
  };
  const tableStructure = useMemo(() => {
    return [
      {
        key: "",
        label: "",
        sortable: false,
        render: (temp, all) => <div className={styles.squareDiv}></div>,
      },
      {
        key: "name",
        label: "Name",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <ButtonBase
              style={{ "text-decoration": "none" }}
              onClick={() => {
                historyUtils.push(RouteName.VIEW_DOCUMENTS, {
                  url: all?.document,
                });
              }}
            >
              <Button
                color="primary"
                variant="contained"
                size="small"
                // onClick={() => (

                // )}
              >
                view
              </Button>
            </ButtonBase>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: employeeHRData,
      mobileRender: mobileTableRender,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    employeeHRData,
  ]);

  return (
    <div className={styles.EmployeeHRWrapper}>
      <div className={styles.desktopTextView}>
        <InformationCard
          heading="HR Policies"
          imageUrl={images}
          data={StaticPolicyData}
        />
      </div>
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Policies List</span>
              <div className={styles.newLine} />
              <div className={styles.iconPositionResponsive}>
                <InfoOutlined
                  fontSize={"small"}
                  style={{ color: "blue" }}
                  onClick={handleOpen}
                />
              </div>
            </div>
          </div>
          {open && <PopupComponent />}
          <div>
            <FilterComponent
              filters={configFilter}
              handleSearchValueChange={handleSearchValueChange}
              handleFilterDataChange={handleFilterDataChange}
            />
          </div>
        </PageBox>
        <div>
          <div style={{ width: "100%" }}>
            <DataTables
              {...tableData.datatable}
              {...tableData.datatableFunctions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHRPolicy;
