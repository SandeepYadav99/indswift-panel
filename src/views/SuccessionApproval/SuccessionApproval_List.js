// /**
//  * Created by sandeepelectrovese@gmail.com on 10/18/2023.
//  */
// import React, {  useCallback,  useMemo } from "react";
// import {
  
//   IconButton,

// } from "@material-ui/core";
// import classNames from "classnames";
// import { useSelector } from "react-redux";
// import { InfoOutlined} from "@material-ui/icons";
// import PageBox from "../../components/PageBox/PageBox.component";
// import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
// import styles from "./Style.module.css";
// import DataTables from "../../Datatables/Datatable.table";
// import Constants from "../../config/constants";
// import FilterComponent from "../../components/Filter/Filter.component";


// import StatusPill from "../../components/Status/StatusPill.component";
// // import CandidateTable from "../../../components/CandidateDataTable/CandidateTable.component";

// import useSuccessionApprovalHook from "./SuccessionApproval_hook";

// const SuccessionApproval_List = ({}) => {
//   const {
//     handleSortOrderChange,
//     handleRowSize,
//     handlePageChange,
//     handleDataSave,
//     handleDelete,
//     handleEdit,
//     handleFilterDataChange,
//     handleSearchValueChange,
//     handleSideToggle,
//     handleViewDetails,
//     editData,
//     isSidePanel,
//     handleCreate,
//     isCalling,
//     configFilter,
//     warehouses,
//     changeEmployeeRoute,
//   } = useSuccessionApprovalHook({});

//   const {
//     data,
//     all: allData,
//     currentPage,
//     is_fetching: isFetching,
//   } = useSelector((state) => state.employee_versions);

//   const renderStatus = useCallback((status) => {
//     return <StatusPill status={status} />;
//   }, []);

//   const renderFirstCell = useCallback((obj) => {
//     if (obj) {
//       return (
//         <div className={styles.firstCellFlex}>
//           <div
//             className={classNames(styles.firstCellInfo, "openSans")}
//             onClick={() => changeEmployeeRoute(obj?.employee)}
//           >
//             <span className={styles.productName}>{obj?.employee?.name}</span>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   }, []);

//   const tableStructure = useMemo(() => {
//     return [
//       {
//         key: "employee",
//         label: "EMPLOYEE",
//         sortable: true,
//         render: (value, all) => <div>{renderFirstCell(all)}</div>,
//       },
//       {
//         key: "doj",
//         label: "D.O.J",
//         sortable: false,
//         render: (temp, all) => <div>{all?.employee?.code}</div>,
//       },
//       {
//         key: "dob",
//         label: "D.O.B",
//         sortable: false,
//         render: (temp, all) => <div>{all?.address}</div>,
//       },
//       {
//         key: "designation",
//         label: "DESIGNATION",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             {all?.editedBy?.name} <br /> {all?.createdAtText}
//           </div>
//         ),
//       },
//       {
//         key: "department",
//         label: "DEPARTMENT",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "location",
//         label: "LOCATION",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "age",
//         label: "AGE",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "date of retirment",
//         label: "DATE OF RETIRMENT",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "annual salary",
//         label: "ANNUAL SALARY",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "succession_const",
//         label: " SUCCESSION'S COST WRT EMPLOYEE",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "succession_const",
//         label: " SUCCESSION'S COST WRT EMPLOYEE",
//         sortable: false,
//         render: (temp, all) => (
//           <div>
//             <StatusPill status={all?.status} />{" "}
//           </div>
//         ),
//       },
//       {
//         key: "current_status",
//         label: "CURRENT STATUR/OVERALL STATUS",
//         sortable: true,
//         render: (temp, all) => (
//           <div>
//             {all?.verifiedAt ? (
//               <div>
//                 {all?.verifiedBy?.name} <br /> {all?.verifiedAtText}{" "}
//               </div>
//             ) : (
//               "-"
//             )}
//           </div>
//         ),
//       },

//       {
//         key: "user_id",
//         label: "Action",
//         render: (temp, all) => (
//           <div>
//             <IconButton
//               className={"tableActionBtn"}
//               color="secondary"
//               disabled={isCalling}
//             //   onClick={() => handleSideToggle(all)}
//             >
//               <InfoOutlined fontSize={"small"} />
//             </IconButton>
//           </div>
//         ),
//       },
//     ];
//   }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

//   const tableData = useMemo(() => {
//     const datatableFunctions = {
//       onSortOrderChange: handleSortOrderChange,
//       onPageChange: handlePageChange,
//       onRowSizeChange: handleRowSize,
//     };

//     const datatable = {
//       ...Constants.DATATABLE_PROPERTIES,
//       columns: tableStructure,
//       data: data,
//       count: allData.length,
//       page: currentPage,
//     };

//     return { datatableFunctions, datatable };
//   }, [
//     allData,
//     tableStructure,
//     handleSortOrderChange,
//     handlePageChange,
//     handleRowSize,
//     data,
//     currentPage,
//   ]);

//   return (
//     <div>
//       <PageBox>
//         <div className={styles.headerContainer}>
//           <div>
//             <span className={styles.title}>Successions Approval</span>
//             <div className={styles.newLine} />
//           </div>
//         </div>

//         <div>
//           <FilterComponent
//             is_progress={isFetching}
//             filters={configFilter}
//             handleSearchValueChange={handleSearchValueChange}
//             handleFilterDataChange={handleFilterDataChange}
//           />
//           <div>
//             <br />
//             <div style={{ width: "100%" }}>
//               <DataTables
//                 {...tableData.datatable}
//                 {...tableData.datatableFunctions}
//               />
//             </div>
//           </div>
//         </div>
//         <SidePanelComponent
//           handleToggle={handleSideToggle}
//           title={"Profile Change Details"}
//           open={isSidePanel}
//           side={"right"}
//         >
//           {/* <VersionDetailView handleClose={handleSideToggle} id={editData} isOpen={isSidePanel} /> */}
//         </SidePanelComponent>
//       </PageBox>
//     </div>
//   );
// };

// export default SuccessionApproval_List;

import React from 'react'

const SuccessionApproval_List = () => {
  return (
    <div>Succession Approval</div>
  )
}

export default SuccessionApproval_List