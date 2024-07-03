import React, { useState } from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeCircularHook from "./EmployeeCircularHook";
import Circularimages from "../../../assets/img/circulars illustration.png";
import FilterComponent from "../../../components/Filter/Filter.component";
import classNames from "classnames";
import { Dialog } from "@material-ui/core";
import { Button, IconButton, ButtonBase } from "@material-ui/core";
import PageBox from "../../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../../components/Datatables/datatables.js";
import Constants from "../../../config/constants";
import { Edit, RemoveRedEyeOutlined as ViewIcon } from "@material-ui/icons";
import StatusPill from "../../../components/Status/StatusPill.component";
import { useMemo } from "react";
import { useCallback } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { InfoOutlined } from "@material-ui/icons";

function EmployeeCircular() {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDataSave,
    handleDelete,
    handleEdit,
    handleSideToggle,
    handleViewDetails,
    editData,
    isSidePanel,
    handleCreate,
    isCalling,
    handleSubDepartment,
    employeeCircularData,
    // data,
    StaticCircularData,
  } = EmployeeCircularHook({});
  const [open, setOpen] = useState(false);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
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
                <span className={styles.title2}>Circular</span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                Time to time various “Circulars” are being issued from the
                office of Top Management to bring clarity on various operational
                aspects
              </p>
              <br />
              <p className={styles.infoDetails}>
                These circulars intend to notify important changes to all
                employees of the organization, at times circulars are bring
                clarity on expectations of deliverabilities. It is of critical
                importance that all employees take serious note of the circulars
                and comply with the guidelines mentioned in them
              </p>
              <br />
              <p className={styles.infoDetails}>
                Over a period some circulars loose attention of employees and
                therefore this section is focused on providing open and quick
                access to all circulars of critical importance ever issued from
                any forum of top management.
              </p>
              <br />
              <p className={styles.infoDetails}>
                Employees are expected to refer these circulars whenever they
                come across any relevant situation at workplace
              </p>
              <br />
              <p className={styles.infoDetails}>
                New circulars being issued in future will automatically be
                updated on the platform.{" "}
              </p>
              <br />
            </div>
          </div>
        </Dialog>
      </div>
    );
  };

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
            <a
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
            </a>
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
      data: employeeCircularData,
      mobileRender: mobileTableRender,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    employeeCircularData,
  ]);
  return (
    <div className={styles.EmployeeCircularWrapper}>
      <div className={styles.desktopTextView}>
        <InformationCard
          heading="Circular"
          imageUrl={Circularimages}
          data={StaticCircularData}
        />
      </div>

      <div>
        {/* <PolicyRecordTable filterWidth={false} /> */}
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Circulars List</span>
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
        </PageBox>
        {open && <PopupComponent />}
        <div>
          <div>
            <br />
            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCircular;
