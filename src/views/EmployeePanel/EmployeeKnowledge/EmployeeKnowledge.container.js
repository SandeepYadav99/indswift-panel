import React, { useState } from "react";
import InformationCard from "../../../components/InformationCard/InformationCard.component";
import EmployeeKnowledgeHook from "./EmployeeKnowledgeHook";
import KnowledgeImages from "../../../assets/img/knowledge center illustration.png";
import FilterComponent from "../../../components/Filter/Filter.component";
import classNames from "classnames";
import { Button, IconButton, ButtonBase } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
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

function EmployeeKnowledge() {
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
    EmployeeKnowledgeData,
    // data,
    StaticKnowledgeData,
  } = EmployeeKnowledgeHook({});
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
              {obj?.location.name}
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        is_mobile: false,
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
              <Button color="primary" variant="contained" size="small">
                view
              </Button>
            </a>
          </div>
        ),
      },
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);


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
                <span className={styles.title2}>Knowledge Center</span>
                <div className={styles.newLine} />
              </div>
              <div onClick={handleClose}>X</div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.infoDetails}>
                Many innovations and initiatives keep going in the organization
                at any given point of time, but these interventions do not live
                to their actual potential until and unless they are properly
                shared and discussed among all intellectuals of the
                organization.
              </p>
              <br />
              <p className={styles.infoDetails}>
                This generates the need to have a common “Knowledge Center”
                where all employees can share anything performed by them that
                has brought some tangible or intangible synergy to the
                organization. It can be a study, a kaizen, a model, a theory, an
                article, a blog or anything which employee feels is worthwhile
                to share with all provided that it should be an intellectual
                subject.
              </p>
              <br />
              <p className={styles.infoDetails}>
                The achievements, exceptional performances, outstanding projects
                competed by any employee will also become part of Knowledge
                center so that everyone in organization can see, appreciate and
                learn from the efforts being done by their colleagues and
                friends
              </p>
              <br />
              <p className={styles.infoDetails}>
                Say for example engineering team of a “Unit” has performed some
                mechanical changes in plant due to which process efficiencies
                has improved at that site, it should be shared (through a work
                paper) with every one so that teams working at other site may
                also learn and apply the innovations to achieve the same
                results.
              </p>
              <br />
              <p className={styles.infoDetails}>
                Knowledge centers if utilized can act as brilliant source of
                knowledge exchange between employees
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
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: EmployeeKnowledgeData,
      mobileRender: mobileTableRender,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    EmployeeKnowledgeData,
  ]);
  return (
    <div className={styles.EmployeeKnowledgeWrapper}>
      <div className={styles.desktopTextView}>
        <InformationCard
          heading="Knowledge Center"
          imageUrl={KnowledgeImages}
          data={StaticKnowledgeData}
        />
      </div>
      <div>
        <PageBox>
          <div className={styles.headerContainer}>
            <div>
              <span className={styles.title}>Knowledge Resources</span>
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

export default EmployeeKnowledge;
