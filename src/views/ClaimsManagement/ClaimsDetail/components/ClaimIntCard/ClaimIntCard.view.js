import React from "react";
import useClaimIntCard from "./ClaimIntCard.hook";
import styles from "./Style.module.css";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { getCurrency, removeUnderScore } from "../../../../../helper/helper";
import LodgingIncludeForm from "./component/Lodgingincludes/LodgingIncludes.component";
import ExpenseIncludeForm from "./component/Expenseincludes/ExpenseIncludes.component";
import DAIncludeForm from "./component/DAincludes/DAIncludes.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import OtherIncludeForm from "./component/Otherincludes/OtherIncludes.component";

function ClaimIntCard() {
  const {
    employeeDetails,
    employees,
    form,
    changeTextData,
    handleSubmit,
    isLoading,
    errorData,
    declaration,
    setDeclaration,
    travelRef,
    otherRef,
    lodgeRef,
    daRef,
    enterRef,
    startDate,
    endDate,
    CoPass,
    tourType,
    changeAmount,
    setCurrency,
  } = useClaimIntCard({});

  return (
    <>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Travel Claim Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <b className={"capitalize"}>Travel Plan Details</b>
        <div className={styles.AutoWrap}>
          <div className={styles.tapWrap}>
            {/* {listData?.length > 0 && ( */}
            <div className="formGroup" style={{ paddingLeft: "0" }}>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option.code,
                }}
                dataset={employees ? employees : []}
                datasetKey={"code"}
                onTextChange={(text, value) => {
                  changeTextData(text, "travel_planner_id");
                }}
                variant={"outlined"}
                label={"Choose your Travel Plan Application (TAP)"}
                name={"travel_planner_id"}
                isError={errorData?.travel_planner_id}
                value={form?.travel_planner_id}
              />
            </div>
            {/* )} */}
          </div>
          {typeof form?.travel_planner_id === "object" && (
            <div className={styles.write}>
              <div className={styles.key}>
                <span className={styles.wrap}>Tour Date</span>
                {form?.travel_planner_id?.startDateText} -
                {form?.travel_planner_id?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.wrap}>Status:</span>
                <StatusPill
                  status={removeUnderScore(form?.travel_planner_id?.status)}
                  style={{ background: "transparent", border: "none" }}
                />
              </div>
              <div className={styles.key}>
                <span className={styles.wrap}>Tour Type:</span>
                {form?.travel_planner_id?.tour_type}
              </div>
            </div>
          )}
        </div>
        {typeof form?.travel_planner_id === "object" && (
          <>
            <div className={styles.verti}></div>
            <div className={styles.heading}>Co- traveller Details</div>
            {form?.travel_planner_id?.co_passengers?.map((item) => (
              <div className={styles.nameWrap}>
                <div className={styles.key} style={{ marginBottom: "3px" }}>
                  {`${item?.name} ( ${item?.emp_code})`}{" "}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div>
            <LodgingIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={lodgeRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
              tourType={tourType}
              setCurrency={setCurrency}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part B: Travel Expense</div>
          <div>
            <ExpenseIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part C: DA & IE Expenses</div>
          <div>
            <DAIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={daRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part D: Entertainment Expenses</div>
          <div>
            <OtherDetailsIncludeForm
              ref={enterRef}
              grade={employeeDetails?.grade?.code}
              startDate={startDate}
              endDate={endDate}
              changeAmount={changeAmount}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part E: Other Expenses</div>
          <div>
            <OtherIncludeForm
              ref={otherRef}
              grade={employeeDetails?.grade?.code}
              startDate={startDate}
              endDate={endDate}
              changeAmount={changeAmount}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Summary</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>Imprest for tour:<span>{form?.travel_planner_id?.imprest?.code}</span></div>
          <div className={styles.headingWrap}>Amount:<span>{getCurrency(form?.travel_planner_id?.imprest?.currency)}{form?.travel_planner_id?.imprest?.amount}</span></div>
        </div>
      </div>
      <div className={styles.cleckboxWrapper}>
        <div className={styles.checkBox}>
          <input
            checked={declaration}
            type="checkbox"
            id="confirmation"
            name="confirmation"
            onChange={() => {
              setDeclaration((s) => !s);
            }}
          />
          <label htmlFor="confirmation">
            {" "}
            I confirm that all the details and attachments are true and no
            duplicate claim for any documents is made by me or my travel plan
            co-travellers.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration || isLoading ? true : false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "Submit"
          )}
        </ButtonBase>
      </div>
    </>
  );
}

export default ClaimIntCard;
