import { ButtonBase, MenuItem } from "@material-ui/core";
import React, { useMemo } from "react";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import usePmsGraphHook from "./PmsGraph.hook";
import RatingTile from "./component/RatingTile/RatingTile.view";
import GraphTable from "./component/GraphTable/GraphTable.view";

function PmsGraph() {
  const {
    fyYear,
    setFyYear,
    graphLoc,
    setGraphLoc,
    batch,
    setBatch,
    initialApiCall,
    listData,
    graphData,
  } = usePmsGraphHook({});
  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Type"}
        value={graphLoc}
        handleChange={(value) => {
          setGraphLoc(value);
          //   sessionStorage.setItem("graphLoc", value);
        }}
      >
        {listData?.LOCATIONS?.map((dT) => {
          return (
            <MenuItem value={dT?.id} key={dT?.id}>
              {dT?.name}
            </MenuItem>
          );
        })}
      </CustomSelectField>
    );
  }, [graphLoc, setGraphLoc, listData]);

  const renderStartDate = useMemo(() => {
    return (
      <CustomSelectField
        label={"Financial Year"}
        value={fyYear}
        handleChange={(value) => {
          setFyYear(value);
          //   sessionStorage.setItem("fyYear", value);
        }}
      >
        <MenuItem value={"2022-2023"}>2023</MenuItem>
      </CustomSelectField>
    );
  }, [fyYear]);

  const renderEndDate = useMemo(() => {
    return (
      <CustomSelectField
        label={"Batch"}
        value={batch}
        handleChange={(value) => {
          setBatch(value);
          //   sessionStorage.setItem("end", value);
        }}
      >
        <MenuItem value={"APMS"}>APMS</MenuItem>
        <MenuItem value={"DTY"}>DTY</MenuItem>
      </CustomSelectField>
    );
  }, [batch]);
  return (
    <div className={styles.graphWrap}>
      <div className={styles.graphCont}>
        <div className={styles.plainPaper}>
          <div className={styles.upperWrap}>
            <div>
              <ButtonBase onClick={() => history.goBack()}>
                <ArrowBackIosIcon
                  fontSize={"small"}
                  className={styles.backIcon}
                />
              </ButtonBase>
            </div>
            <div className={styles.historyWrap}>
              <div style={{ fontSize: "0.8rem" }}>
                <b>PMS Normalized Graphs</b>
              </div>
              <div className={styles.newLine} />
            </div>
            <div className={styles.yearFlex}>
              <div className={styles.down}>{renderDropDown}</div>
              <div className={styles.down}>{renderStartDate}</div>
              <div className={styles.down}>{renderEndDate}</div>
              <div className={styles.rightFlex}>
                <ButtonBase
                  aria-haspopup="true"
                  onClick={() => initialApiCall()}
                  className={"createBtn"}
                >
                  Update
                </ButtonBase>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.plainPaper}>
          <div className={styles.heading}>Organizational Overview</div>
          <div className={styles.RatingUpperWrap}>
            <RatingTile title="Employees" value={graphData?.stats?.employees} />
            <RatingTile title="Employees Average Rating" value={10} />
            <RatingTile title="Reviewers Average Rating" value={10} />
            <RatingTile title="Normalized Rating" value={10} />
          </div>
          <div className={styles.graphTableWrap}></div>
          <GraphTable data={graphData?.overall} title="2022-2023"/>
        </div>
      </div>
    </div>
  );
}

export default PmsGraph;
