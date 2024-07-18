import React, { Component, useCallback, useMemo, useState } from "react";
import { ButtonBase, Checkbox, CircularProgress, TextField } from "@material-ui/core";
import styles from "./Style.module.css";
import DataTables from "../../../../../../Datatables/Datatable.table";
import Constants from "../../../../../../config/constants";
import FilterComponent from "../../../../../../components/Filter/Filter.component";
import useAddEmployeeTable from "./AddEmployeeTable.hook";
import StatusPill from "../../../../../../components/Status/StatusPill.component";
import { removeUnderScore } from "../../../../../../helper/helper";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../../../../libs/history.utils";
import CustomSelectField from "../../../../../../components/FormFields/SelectField/SelectField.component";
import AutoCompleteText from "../../../../../../components/FormFields/AutoCompleteText/AutoCompleteText";
import CustomAutoComplete from "../../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import AutoCompleteChip from "../../../../../../components/FormFields/AutoCompleteText/AutoCompleteChip";
import { Autocomplete } from "@material-ui/lab";
const AddEmployeeTable = ({ handleClose }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    editData,
    isCalling,
    handleCheckbox,
    selected,
    allData,
    data,
    currentData,
    currentPage,
    isFetching,
    isSubmitting,
    handleSubmit,
    changeTextData,
    form,
    employees,
    errorData,
    allSelect,
    setAllSelect
  } = useAddEmployeeTable({ handleClose });

  const handleAllDataChange = useCallback(
    (event) => {
      const checked = event.target.checked;
      setAllSelect(checked);
      const updatedPermissions = selected?.map((permission) => ({
        ...permission,
        id: checked,
      }));

      handleCheckbox(updatedPermissions);
    },
    [data, setAllSelect, handleCheckbox, selected, allSelect]
  );
  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);
console.log(allSelect)
  const renderFirstCell = useCallback(
    (data) => {
      const selectedIndex = selected.findIndex((sel) => sel.id === data.id);
      return (
        <div className={styles.flex}>
          <Checkbox
            disabled={false}
            onChange={() => handleCheckbox(data)}
            checked={ allSelect &&
              selected.every((permission) => permission?.id) ? allSelect : selectedIndex >= 0 }
            value="secondary"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      );
    },
    [handleCheckbox, selected, allSelect]
  );

  const renderProfile = useCallback((data) => {
    return (
      <div className={styles.imgWrap}>
        <img src={data?.image} className={styles.img} />
        <div>
          <b>{data?.name}</b> <br />
          {data?.code}
        </div>
      </div>
    );
  }, []);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "select",
        label:<Checkbox  checked={allSelect && selected.every((permission) => permission.id)} onChange={handleAllDataChange}  value="secondary"
        color="primary"
        inputProps={{ "aria-label": "secondary checkbox" }}/>,
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "name",
        label: "EMPLOYEE NAME",
        sortable: false,
        render: (temp, all) => <div>{renderProfile(all)}</div>,
      },
      {
        key: "location",
        label: "LOCATION",
        sortable: false,
        render: (temp, all) => <div>{all?.location?.name || "-"}</div>,
      },
      {
        key: "department",
        label: "DEPARTMENT/ROLE",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.department?.name || "-"}
            <br />
            {all?.role?.name || "-"}
          </div>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <div>
            <StatusPill status={removeUnderScore(all?.status)} />
          </div>
        ),
      },
    ];
  }, [
    renderStatus,
    renderFirstCell,
    renderProfile,
    handleViewDetails,
    handleEdit,
    isCalling,
  ]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData,
      count: data.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    currentData,
  ]); // allData,

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.listAction}>
        {/* <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} /> 
        </ButtonBase>
       
        <div><b>Add Employees</b></div>
          <div className={styles.newLine}/> */}
            <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
        </ButtonBase>
        <div className={styles.actionTitle}>
          <div className={styles.addEmployeeTitle}>Add Employees</div>
          <div className={styles.newLine}/>
        </div>
      </div>
      <div className={styles.sliderWrapperContainer}>
        <div className={styles.empDetails}>Employee Details</div>
        <div>
        <div className={"formGroup"}>
        <Autocomplete
           freeSolo
           multiple
             value={form?.location_aplly}
              options={employees ? employees : []}
              getOptionLabel={(option) => option?.label}
              // onChange={(event, newValue) => {
              //   changeTextData()
              // })
              onChange={(event, newValue) => {
                changeTextData(newValue, "location_aplly");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Locations Applicable"
                 
                />
              )}
              size="small"
            />
          </div>
        </div>
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />
          <br />
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={"creatBTN"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            " ADD"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default AddEmployeeTable;
