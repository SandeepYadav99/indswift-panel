import React, { Component, useCallback, useEffect, useMemo } from "react";

import classNames from "classnames";
import { useSelector } from "react-redux";

import PageBox from "../../components/PageBox/PageBox.component";
import styles from "./Style.module.css";
import DataTables from "../../Datatables/Datatable.table";
import Constants from "../../config/constants";
import StatusPill from "../../components/Status/StatusPill.component";
import { useState } from "react";


const TravelList = ({ location }) => {


  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
  
    const fetchData = async () => {
      const response = await fetch('/CandidateStatus.json');
      const data = await response.json();

      setCandidates(data.candidates);
    };

    fetchData(); 
  }, []);

  const tableStructure = useMemo(() => {
    return [
      {
        key: "status",
        label: "STATUS",
        sortable: false,
        render: (value, all) =><div style={{width:"20rem"}}><StatusPill status={all?.status} /> </div> ,
      },
      {
        key: "Meaning",
        label: "MEANING",
        sortable: false,
        render: (temp, all) => <div>{all?.description}</div>,
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const datatableFunctions = {
     
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: candidates,
      count: candidates.length,
   
    };

    return { datatableFunctions, datatable };
  }, [
 
    tableStructure,
    candidates,
   
  ]);

  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <div>
            <span className={styles.title}>Candidate Status Glossary</span>
            <div className={styles.newLine} />
          </div>
        </div>
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </PageBox>
    </div>
  );
};

export default TravelList;
