import { ButtonBase, MenuItem } from "@material-ui/core";
import React, { useMemo } from "react";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import usePmsGraphHook from "./PmsGraph.hook";
import RatingTile from "./component/RatingTile/RatingTile.view";
import GraphTable from "./component/GraphTable/GraphTable.view";
import LineChartGraph from "./component/LineChartGraph/LineChartGraph.view";
import PmsInfoTable from "./component/PmsInfoTable/PmsInfoTable.view";
import AvgTable from "./component/AvgTable/AvgTable.view";

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
    tableData,
    avgData,
  } = usePmsGraphHook({});
  const renderDropDown = useMemo(() => {
    return (
      <CustomSelectField
        label={"Location"}
        value={graphLoc}
        handleChange={(value) => {
          setGraphLoc(value);
          //   sessionStorage.setItem("graphLoc", value);
        }}
      >
        <MenuItem value={'ALL'} key={'ALL'}>
          ALL
        </MenuItem>
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
        <MenuItem value={"2023"}>2023</MenuItem>
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
            <RatingTile
              title="Employees"
              value={
                graphData?.stats?.employees ? graphData?.stats?.employees : "-"
              }
            />
            <RatingTile
              title="Employees Average Rating"
              value={
                graphData?.stats?.employee_avg_rating
                  ? graphData?.stats?.employee_avg_rating
                  : "-"
              }
            />
            <RatingTile
              title="Reviewers Average Rating"
              value={
                graphData?.stats?.reviewer_avg_rating
                  ? graphData?.stats?.reviewer_avg_rating
                  : "-"
              }
            />
            {graphLoc === 'ALL' && (<RatingTile
              title="Normalized Rating"
              value={
                graphData?.stats?.normalized_rating
                  ? graphData?.stats?.normalized_rating
                  : "-"
              }
            />)}
          </div>
          {graphData?.overall?.length > 0 && (
            <div className={styles.graphTableWrap}>
              <GraphTable
                shouldHideAvg={true}
                data={graphData?.overall}
                title={fyYear ? `${fyYear - 1}-${fyYear}` : ""}
              />
              <LineChartGraph dataValues={graphData?.overall} />
            </div>
          )}
        </div>
        {graphData?.grades?.length > 0 && (
          <div className={styles.plainPaper}>
            <div className={styles.heading}>Grade-Wise Overview</div>
            <div className={styles.AvgWrap}>
              <AvgTable data={avgData} />
            </div>
            <div className={styles.gradeTable}>
              {graphData?.grades?.map((item, index) => (
                <GraphTable
                  key={`grade_ind_${index}`}
                  data={item?.ratings}
                  title={item?.code}
                />
              ))}
            </div>
          </div>
        )}
        <div className={styles.plainPaper}>
          <div className={styles.heading}>Reviewer-Wise Overview</div>
          <PmsInfoTable PmstableData={tableData} />
        </div>
      </div>
    </div>
  );
}

export default PmsGraph;
